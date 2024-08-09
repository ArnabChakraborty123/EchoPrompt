import Link from "next/link";
import { Typography } from 'antd';
const { Title } = Typography;
import { useState } from 'react';
import { PollyClient, SynthesizeSpeechCommand } from '@aws-sdk/client-polly';
import Audioplayer from "./Audioplayer";

const pollyClient = new PollyClient({
  region: process.env.NEXT_PUBLIC_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_CLIENT_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY,
  },
});

function Form({ type, post, setPost, submitting, handleSubmit }) {
  const [audioFile, setAudioFile] = useState(null);
  const [isConverting, setIsConverting] = useState(false);

  const convertPromptToAudio = async () => {
    setIsConverting(true);
    try {
      const params = {
        OutputFormat: 'mp3',
        Text: post.prompt,
        VoiceId: 'Salli',
      };
      const command = new SynthesizeSpeechCommand(params);
      const response = await pollyClient.send(command);
      setAudioFile(response);
    } catch (error) {
      console.error('Error converting prompt to audio:', error);
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start">
      <section className="w-full md:w-2/3 max-w-full flex-start flex-col">
        <Title>
          <span className="font-bold text-5xl leading-[1.15] text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-300">
            {type} post
          </span>
        </Title>
        <p className="mt-4 text-lg text-gray-600">
          Unleash your creativity by crafting and sharing captivating prompts with the world. Dive into an AI-powered realm that nurtures your imagination and lets it roam freely.
        </p>
        <form
          onSubmit={handleSubmit}
          className="mt-10 w-full max-w-xl flex flex-col gap-7 glassmorphism"
        >
          <label>
            <span className="font-satoshi font-semibold text-base text-gray-700">Your AI Prompt</span>
            <textarea
              placeholder="your prompt here"
              value={post.prompt}
              onChange={(e) => setPost({ ...post, prompt: e.target.value })}
              className="form_textarea"
            />
            <div className="absolute right-2 text-gray-400 text-xs">
              <span>{post.prompt.length}</span>/60
            </div>
          </label>
          <label>
            <span className='font-satoshi font-semibold text-base text-gray-700'>
              Field of Prompt{" "}
              <span className="font-normal">
                (#product, #webdevelopment, #idea, etc.)
              </span>
            </span>
            <input
              placeholder="#Tag"
              required
              value={post.tag}
              onChange={(e) => setPost({ ...post, tag: e.target.value })}
              className="form_input"
            />
          </label>
          <div className="flex justify-between items-center">
            <Link href="/" className="text-blue-500 font-semibold">
              Cancel
            </Link>
            <div className="flex items-center gap-4">
              <button
                type="button"
                disabled={isConverting}
                onClick={convertPromptToAudio}
                className="px-5 py-1.5 rounded-lg bg-gradient-to-r from-blue-700 to-blue-400 text-white font-semibold"
              >
                {isConverting ? 'Converting...' : 'Convert to Audio'}
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-1.5 rounded-lg bg-gradient-to-r from-blue-700 to-blue-400 text-white font-semibold"
              >
                {submitting ? `${type}...` : type}
              </button>
            </div>
          </div>
        </form>
      </section>
      {audioFile && (
        <div className="w-full md:w-1/3 md:ml-8 mt-8 md:mt-0">
          <Audioplayer
            audioFile={audioFile}
            isTextEntered={post.prompt.length > 0}
            color="from-blue-700 to-blue-400"
          />
        </div>
      )}
    </div>
  );
}

export default Form;