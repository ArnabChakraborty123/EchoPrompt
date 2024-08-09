"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

function Nav() {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };
    setUpProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 items-center">
        <Image
          src="/assets/images/logo.jpeg"
          alt="PromptoVerse Logo"
          width={30}
          height={30}
          className="rounded-full"
        />
        <p className="logo_text">EchoPrompt</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden ">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <button className="rounded-full border border-blue px-4 py-2 hover:bg-blue-700 hover:text-white transition-colors">
              <Link href="/create-prompt">Post Your Creativity</Link>
            </button>
            <button
              className="rounded-full border border-blue px-4 py-2 hover:bg-blue-700 hover:text-white transition-colors"
              onClick={signOut}
            >
              sign out
            </button>
            <Link href="/profile">
              <Image
                src={session?.user.image}
                width={30}
                height={30}
                className="rounded-full"
                alt="user-profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="rounded-full bg-blue-500 text-white px-4 py-2 transition-colors hover:bg-blue-600"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div>
            <Image
              src={session?.user.image}
              alt="PromptoVerse Logo"
              width={37}
              height={37}
              className="rounded-full"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />
            {toggleDropdown && (
              <div className="dropdown-3d">
                <Link
                  href="/profile"
                  className="dropdown-link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown-link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="rounded-full border border-blue-500 text-blue-500 px-4 py-2 transition-colors hover:bg-blue-700 hover:text-white"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="rounded-full bg-blue-500 text-white px-4 py-2 transition-colors hover:bg-blue-600"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
}

export default Nav;
