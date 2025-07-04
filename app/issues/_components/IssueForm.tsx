'use client';

import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { issueSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue } from '@prisma/client';
import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import SimpleMDE from 'react-simplemde-editor';
import { z } from 'zod';

type IssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });
  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      if (issue) await axios.patch('/api/issues/' + issue.id, data);
      else await axios.post('/api/issues', data);
      router.push('/issues/list');
      router.refresh();
    } catch (error) {
      setSubmitting(false);
      setError('An unexpected error occurred.');
    }
  });

  return (
    <div className="max-w-5xl w-full mx-auto">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="bg-white/80 dark:bg-zinc-900/80 border border-blue-200 dark:border-blue-900 rounded-3xl shadow-2xl px-8 py-10 backdrop-blur-md flex flex-col gap-10 animate-fade-in-up"
        onSubmit={onSubmit}
      >
        <div className="flex flex-col md:flex-row gap-10 w-full">
          {/* Title Field + Button */}
          <div className="flex-1 flex flex-col gap-3 justify-between min-h-[220px] h-full">
            <label
              htmlFor="title"
              className="text-lg font-extrabold text-blue-500 tracking-wide flex items-center gap-2 mb-2"
            >
              <span className="text-2xl">📝</span> Issue Title
              <span className="ml-2 text-xs bg-blue-500/20 text-blue-700 px-2 py-0.5 rounded-full animate-pulse">
                Required
              </span>
            </label>
            <TextField.Root className="rounded-xl shadow-lg bg-zinc-800/80 border border-blue-500/30 focus-within:ring-2 focus-within:ring-blue-400 transition-all h-full">
              <TextField.Input
                id="title"
                defaultValue={issue?.title}
                placeholder="e.g. Login button not working"
                className="bg-transparent text-black dark:text-blue-100 placeholder-blue-300 font-semibold text-lg px-4 py-4 focus:outline-none min-h-[56px] h-full"
                {...register('title')}
              />
            </TextField.Root>
            <ErrorMessage>{errors.title?.message}</ErrorMessage>
            {/* Submit Button below title */}
            <div className="flex justify-center mt-6 animate-fade-in-up delay-200">
              <Button
                disabled={isSubmitting}
                className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-violet-500 text-zinc-900 font-extrabold px-16 py-6 rounded-3xl shadow-2xl text-2xl hover:scale-105 hover:from-yellow-300 hover:to-violet-400 transition-all duration-200 tracking-wider"
              >
                {issue ? 'Update Issue' : 'Submit New Issue'}{' '}
                {isSubmitting && <Spinner />}
              </Button>
            </div>
          </div>
          {/* Divider for desktop */}
          <div className="hidden md:block w-0.5 bg-gradient-to-b from-blue-200 via-blue-400 to-yellow-200 rounded-full mx-2" />
          {/* Description Field */}
          <div className="flex-1 flex flex-col gap-3 justify-between min-h-[220px] h-full">
            <label
              htmlFor="description"
              className="text-lg font-extrabold text-violet-400 tracking-wide flex items-center gap-2 mb-2"
            >
              <span className="text-2xl">💬</span> Description
              <span className="ml-2 text-xs bg-violet-500/20 text-violet-700 px-2 py-0.5 rounded-full animate-pulse">
                Required
              </span>
            </label>
            <Controller
              name="description"
              control={control}
              defaultValue={issue?.description}
              render={({ field }) => (
                <div className="h-full flex-1 flex flex-col">
                  <SimpleMDE
                    id="description"
                    placeholder="Describe the issue in detail..."
                    className="rounded-xl shadow-lg bg-zinc-800/80 border border-violet-500/30 text-blue-100 font-medium focus:outline-none min-h-[120px] h-full flex-1"
                    {...field}
                  />
                </div>
              )}
            />
            <ErrorMessage>{errors.description?.message}</ErrorMessage>
          </div>
        </div>
      </form>
      <style jsx global>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.4, 0, 0.2, 1) both;
        }
      `}</style>
    </div>
  );
};

export default IssueForm;
