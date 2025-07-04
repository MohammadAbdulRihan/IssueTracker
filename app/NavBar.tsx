"use client";

import { Skeleton } from "@/app/components";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import {
  Avatar,
  Box,
  Button,
  Container,
  DropdownMenu,
  Flex,
  IconButton,
  Text,
} from "@radix-ui/themes";

const NavBar = () => {
  return (
    <nav className="w-full border-b-4 border-blue-400 px-8 py-4 bg-gradient-to-r from-white via-sky-100 to-blue-100 dark:from-zinc-900 dark:via-indigo-900 dark:to-violet-700 shadow-2xl sticky top-0 z-50 transition-colors duration-500">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="4">
            <Link href="/">
              <AiFillBug className="text-4xl text-blue-500 dark:text-violet-300 drop-shadow-glow animate-bounce-slow hover:scale-125 transition-transform duration-300" />
            </Link>
            <span className="ml-2 text-2xl font-extrabold bg-gradient-to-r from-blue-400 via-sky-400 to-yellow-400 bg-clip-text text-transparent tracking-tight animate-gradient-text">
              Issue Tracker
            </span>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
      <style jsx global>{`
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-12px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2.5s infinite;
        }
        @keyframes gradient-text {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-text {
          background-size: 200% 200%;
          animation: gradient-text 4s ease-in-out infinite;
        }
        .drop-shadow-glow {
          filter: drop-shadow(0 0 16px #f472b6) drop-shadow(0 0 8px #f472b6);
        }
      `}</style>
    </nav>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();

  const links = [
    { label: "Home", href: "/" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "All Issues", href: "/issues/list" },
    { label: "New Issue", href: "/issues/new" },
  ];

  return (
    <ul className="flex space-x-6">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            className={classnames({
              "nav-link": true,
              active: link.href === currentPath,
              "!text-zinc-900":
                link.href === currentPath &&
                typeof window !== "undefined" &&
                window.matchMedia("(prefers-color-scheme: light)").matches,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading") return <Skeleton width="3rem" />;

  if (status === "unauthenticated")
    return (
      <Link className="nav-link" href="/api/auth/signin">
        Login
      </Link>
    );

  return (
    <Box>
      <Flex align="center" gap="3">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Avatar
              src={session!.user!.image!}
              fallback="?"
              size="2"
              radius="full"
              className="cursor-pointer"
              referrerPolicy="no-referrer"
            />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Label>
              <Text size="2">{session!.user!.email}</Text>
            </DropdownMenu.Label>
            <DropdownMenu.Item>
              <button
                onClick={async () => {
                  const { signOut } = await import("next-auth/react");
                  await signOut({ callbackUrl: "/" });
                }}
                className="w-full text-left bg-transparent border-0 p-0 m-0 cursor-pointer text-red-600 hover:underline"
              >
                Log out
              </button>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Flex>
    </Box>
  );
};

export default NavBar;
