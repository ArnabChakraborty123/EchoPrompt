"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { PollyClient, SynthesizeSpeechCommand } from '@aws-sdk/client-polly';

const pollyClient = new PollyClient({
  region: process.env.NEXT_PUBLIC_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_CLIENT_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY,
  },
});

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const [copied, setCopied] = useState("");
  const [isConverting, setIsConverting] = useState(false);

  const handlProfileClick = () => {
    if (post.creator._id === session?.user.id) return router.push('/profile');
    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  };

  const convertTextToAudio = async () => {
    setIsConverting(true);
    try {
      const params = {
        OutputFormat: 'mp3',
        Text: post.prompt,
        VoiceId: 'Salli',
      };
      const command = new SynthesizeSpeechCommand(params);
      const response = await pollyClient.send(command);
      playAudio(response);
    } catch (error) {
      console.error('Error converting text to audio:', error);
    } finally {
      setIsConverting(false);
    }
  };

  const playAudio = (audioResponse) => {
    const audioStream = audioResponse.AudioStream;
    const response = new Response(audioStream);
    response.blob().then((blob) => {
      const audioUrl = URL.createObjectURL(blob);
      const audio = new Audio(audioUrl);
      audio.play();
    });
  };

  return (
    <div className='prompt_card p-6 bg-white rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-r from-purple-400 via-pink-500 to-red-500'>
      <div className='flex justify-between items-start gap-3'>
        <div 
          className='flex-1 flex items-center gap-3 cursor-pointer' 
          onClick={handlProfileClick}
        >
          <Image
            src={post.creator.image}
            alt='user_image'
            width={40}
            height={40}
            className='rounded-full object-cover shadow-md'
          />
          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-gray-900 hover:text-white'>
              {post.creator.username}
            </h3>
            <p className='font-inter text-sm text-gray-500 truncate max-w-[200px] hover:text-white'>
              {post.creator.email}
            </p>
          </div>
        </div>
        <div className='copy_btn' onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
            className='hover:scale-110 transition-transform duration-200'
          />
        </div>
      </div>
      <div className='flex items-start justify-between mt-4'>
        <p className='flex-1 font-satoshi text-sm text-gray-700 break-words hover:text-white'>
          {post.prompt}
        </p>
        <button
          className={`ml-3 p-2 rounded-full transition-colors duration-300 ${
            isConverting
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
          onClick={convertTextToAudio}
          disabled={isConverting}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
            />
          </svg>
        </button>
      </div>
      <p 
        className='mt-3 font-inter text-sm blue_gradient cursor-pointer hover:text-white'
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag}
      </p>
      {session?.user.id === post.creator._id && pathName === '/profile' &&
        (
          <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
            <p
              className='font-inter text-sm green_gradient cursor-pointer hover:text-white'
              onClick={handleEdit}
            >
              Edit
            </p>
            <p
              className='font-inter text-sm orange_gradient cursor-pointer hover:text-white'
              onClick={handleDelete}
            >
              Delete
            </p>
          </div>
        )
      }
    </div>
  );
};

export default PromptCard;
