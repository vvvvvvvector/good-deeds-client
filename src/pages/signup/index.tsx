import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';

import { useForm, FieldValues } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import toast from 'react-hot-toast';

import Auth from '@/layouts/Auth';

const signUpValidationSchema = z.object({
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
  password: z.string().nonempty({ message: 'Password is required.' }),
});

export default function SignUp() {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<z.infer<typeof signUpValidationSchema>>({
    resolver: zodResolver(signUpValidationSchema),
  });

  const onSubmit = async (data: FieldValues) => {
    const id = toast.loading('Signing up...');

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password,
      }),
    });

    const resjson = await res.json();

    console.log(resjson);

    if (resjson.message === 'success') {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.ok) {
        router.push('/me');

        toast.success('Sign up successfully.', { id });
      } else {
        toast.error('Sign up failed.', { id });
      }
    } else {
      if (resjson.statusCode === 500) {
        toast.error('User with that username already exists.', { id });
      } else {
        toast.error(resjson.message, { id });
      }
    }
  };

  return (
    <Auth>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
        <div className='flex flex-col gap-2 min-h-[140px]'>
          <label htmlFor='username'>Username</label>
          <input
            {...register('username', { required: true })}
            id='username'
            spellCheck='false'
            type='text'
            className={`rounded border border-zinc-400 p-3 ${
              errors.username ? 'border-red-500' : 'focus:border-teal-500'
            } bg-none`}
            placeholder='goodthinger'
          />
          {errors.username && (
            <p className='tracking-wide'>{errors.username.message}</p>
          )}
        </div>
        <div className='flex flex-col gap-2 min-h-[140px]'>
          <label htmlFor='email'>Email</label>
          <input
            {...register('email', { required: true })}
            id='email'
            spellCheck='false'
            type='text'
            className={`rounded border border-zinc-400 p-3 ${
              errors.email ? 'border-red-500' : 'focus:border-teal-500'
            } bg-none`}
            placeholder='goodthinger@io.com'
          />
          {errors.email && (
            <p className='tracking-wide'>{errors.email.message}</p>
          )}
        </div>
        <div className='flex flex-col gap-2 min-h-[140px]'>
          <label htmlFor='password'>Password</label>
          <input
            {...register('password', { required: true })}
            id='password'
            type='password'
            className={`rounded border border-zinc-400 p-3 ${
              errors.password ? 'border-red-500' : 'focus:border-teal-500'
            } bg-none`}
            placeholder='super secret'
          />
          {errors.password && (
            <p className='tracking-wide'>{errors.password.message}</p>
          )}
        </div>
        <button
          disabled={Object.keys(errors).length > 0}
          type='submit'
          className='rounded text-white transition-[background-color] disabled:bg-gray-200 font-medium bg-teal-500 hover:bg-teal-600 p-3'
        >
          Sign up 🚀
        </button>
      </form>
    </Auth>
  );
}
