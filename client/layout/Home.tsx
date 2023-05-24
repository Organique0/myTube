import { AppShell, Navbar, Header, Box, Anchor } from "@mantine/core";
import Image from "next/image";
import React from "react";
import { useMe } from "../context/me";
import Link from "next/link";
import UploadVideo from "@/components/UploadVideo";

export default function HomePageLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const { user, refetch } = useMe();
  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 300 }} height={500} p="xs">
          side items
        </Navbar>
      }
      header={
        <Header height={60} p="xs">
          <Box sx={() => ({ display: "flex" })}>
            <Box sx={() => ({ flex: "1" })}>
              <Image src="/next.svg" alt="logo" width="100" height="40" />
            </Box>

            {!user && (
              <>
                <Link href="/auth/login" passHref>
                  <Anchor ml="lg" mr="lr">
                    Login
                  </Anchor>
                </Link>
                <Link href="/auth/register" passHref>
                  <Anchor ml="lg" mr="lr">
                    Register
                  </Anchor>
                </Link>
              </>
            )}

            {user && <UploadVideo />}
          </Box>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
}
