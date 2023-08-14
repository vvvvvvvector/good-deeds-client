import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { useRouter } from 'next/router';

import { FieldValues, useForm } from 'react-hook-form';

import * as Api from '@/pages/api';

import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { signOut } from 'next-auth/react';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { toast } from 'react-hot-toast';

import MeLayout from '@/layouts/MeLayout';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/refused',
        permanent: false,
      },
    };
  }

  try {
    const user = await Api.users.getMyEmailAndUsername(session.user.token);

    return {
      props: {
        token: session.user.token,
        user,
      },
    };
  } catch (error) {
    console.log(error);

    return {
      props: {
        token: session.user.token,
        user: null,
      },
    };
  }
};

const updateUserValidationSchema = z.object({
  email: z
    .string()
    .nonempty({
      message: 'Email is required.',
    })
    .email({ message: 'Email is not valid.' }),
  username: z
    .string()
    .nonempty({ message: 'Username is required.' })
    .min(5, { message: 'Username is too short (5 chars min).' })
    .max(19, { message: 'Username is too long.' }),
  password: z.string(),
});

export default function Profile({
  token,
  user,
}: {
  token: string;
  user: {
    email: string;
    username: string;
  };
}) {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<z.infer<typeof updateUserValidationSchema>>({
    resolver: zodResolver(updateUserValidationSchema),
    defaultValues: {
      username: user.username,
      email: user.email,
      password: '',
    },
  });

  const onSubmit = async (data: FieldValues) => {
    const id = toast.loading('Saving...');

    try {
      const response = await Api.users.updateMyProfile(
        {
          email: data.email,
          username: data.username,
          password: data.password,
        },
        token
      );

      if (response.message === 'success') {
        toast.success('Your profile was successfully updated.', { id });
      } else {
        toast.error("Your profile was't updated. Error occured.", { id });
      }
    } catch (error) {
      console.log(error);

      toast.error('Error occured while updating Your profile.', { id });
    }
  };

  const onClickDeleteProfile = async () => {
    const result = window.confirm('Are You sure?');

    if (result) {
      const id = toast.loading('Deleting...');

      await Api.users.deleteMyProfile(token);

      await signOut({
        redirect: false,
      });

      router.push('/');

      toast.success('Profile was successfully deleted.', { id });
    }
  };

  return (
    <MeLayout>
      <h1 className='text-lg text-center'>{`Hello ${user.username}!`}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
        <div className='flex flex-col gap-2 min-h-[130px]'>
          <label htmlFor=''>Username</label>
          <input
            {...register('username')}
            id='username'
            type='text'
            className='rounded border border-zinc-400 p-3 bg-none'
          />
          {errors.username && (
            <p className='tracking-wide'>{errors.username.message}</p>
          )}
        </div>
        <div className='flex flex-col gap-2 min-h-[130px]'>
          <label htmlFor='email'>Email</label>
          <input
            {...register('email')}
            id='email'
            type='text'
            className='rounded border border-zinc-400 p-3 bg-none'
          />
          {errors.email && (
            <p className='tracking-wide'>{errors.email.message}</p>
          )}
        </div>
        <div className='flex flex-col gap-2 min-h-[130px]'>
          <label htmlFor='password'>Password</label>
          <input
            {...register('password')}
            id='password'
            type='password'
            placeholder='New password here...'
            className='rounded border border-zinc-400 p-3 bg-none'
          />
        </div>
        <div className='flex justify-center'>
          <button
            type='submit'
            className='w-[50%] rounded text-white transition-[background-color] disabled:bg-gray-200 font-medium bg-teal-500 hover:bg-teal-600 p-3'
          >
            Save
          </button>
        </div>
      </form>
      <div className='flex justify-center'>
        <button
          onClick={onClickDeleteProfile}
          className='w-[50%] rounded text-white transition-[background-color] font-medium bg-red-500 hover:bg-red-600 p-3'
        >
          Delete profile
        </button>
      </div>
    </MeLayout>
  );
}
