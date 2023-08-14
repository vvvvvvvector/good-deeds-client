import { useRouter } from 'next/router';

import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';

import { useForm, FieldValues } from 'react-hook-form';
import toast from 'react-hot-toast';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { signIn } from 'next-auth/react';

import Auth from '@/layouts/Auth/Auth';

import styles from '@/styles/Forms.module.scss';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    return {
      redirect: {
        destination: `/me`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

const signInValidationSchema = z.object({
  email: z
    .string()
    .nonempty({
      message: 'Email is required.',
    })
    .email({ message: 'Email is not valid.' }),
  password: z.string().nonempty({ message: 'Password is required.' }),
});

export default function SignIn() {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<z.infer<typeof signInValidationSchema>>({
    resolver: zodResolver(signInValidationSchema),
  });

  const onSubmit = async (data: FieldValues) => {
    const id = toast.loading('Signing in...');

    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result?.ok) {
      router.push('/me');

      toast.success('Signed in successfully.', { id });
    } else {
      toast.error('Wrong email or password.', { id });
    }
  };

  return (
    <Auth>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.welcomeForm}>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            {...register('email')}
            id='email'
            spellCheck='false'
            type='text'
            className={`custom-input ${errors.email && 'error'}`}
            placeholder='goodthinger@io.com'
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            {...register('password')}
            id='password'
            type='password'
            className={`custom-input ${errors.password && 'error'}`}
            placeholder='super secret'
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <button
          disabled={Object.keys(errors).length > 0}
          type='submit'
          className='custom-button filled green'
        >
          Sign in 🚀
        </button>
      </form>
    </Auth>
  );
}
