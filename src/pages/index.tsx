import { useRouter } from 'next/router';

import { useForm, FieldValues } from 'react-hook-form';
import toast from 'react-hot-toast';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { signIn } from 'next-auth/react';

import Auth from '@/layouts/Auth';

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
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
        <div className='flex flex-col gap-2 min-h-[140px]'>
          <label htmlFor='email'>Email</label>
          <input
            {...register('email')}
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
            {...register('password')}
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
          Sign in 🚀
        </button>
      </form>
    </Auth>
  );
}
