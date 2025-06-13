"use client";
// src/app/page.tsx

import {
  Blink,
  useBlink,
  useActionsRegistryInterval,
} from "@dialectlabs/blinks";

import "@dialectlabs/blinks/index.css";

import { useEvmWagmiAdapter } from "@dialectlabs/blinks/hooks/evm";

import { ConnectKitButton, useModal } from "connectkit";
import Image from "next/image";

export default function Home() {
  // Actions registry interval
  useActionsRegistryInterval();

  // ConnectKit modal
  const { setOpen } = useModal();

  // Wagmi adapter, used to connect to the wallet
  const { adapter } = useEvmWagmiAdapter({
    onConnectWalletRequest: async () => {
      setOpen(true);
    },
  });

  // Action we want to execute in the Blink
  const { blink, isLoading } = useBlink({
    url: "evm-action:http://localhost:3000/api/actions/donate-mon",
  });

  return (
    <main className="flex gap-2 min-h-screen p-2 max-xl:flex-col-reverse">
      <div className="w-100 self-center">
        {isLoading || !blink ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-spin mx-auto size-50"
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
        ) : (
          // Blink component, used to execute the action
          <Blink
            blink={blink}
            stylePreset="x-dark"
            adapter={adapter}
            securityLevel="all"
          />
        )}
      </div>
      <div className="flex flex-col grow">
        <div className="flex justify-end">
          <ConnectKitButton />
        </div>
        <div className="grow flex">
          <div className="text-5xl px-10 self-center w-max mx-auto relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            className="absolute -bottom-30 size-20"
          >
            <path
              d="M15.921 0C11.3234 0 0 11.3792 0 15.9999C0 20.6206 11.3234 32 15.921 32C20.5186 32 31.8422 20.6204 31.8422 15.9999C31.8422 11.3794 20.5188 0 15.921 0ZM13.44 25.1492C11.5012 24.6183 6.28864 15.455 6.81704 13.5066C7.34544 11.5581 16.4634 6.31979 18.4021 6.8508C20.341 7.38173 25.5535 16.5449 25.0252 18.4934C24.4968 20.4418 15.3787 25.6802 13.44 25.1492Z"
              fill="#836EF9"
            />
          </svg>
            YOUR MONEY IS{" "}
            <span className="relative inline-block">
              <span className="absolute top-0 left-0 -translate-y-full text-red-400">
                SAFE
              </span>
              <span>GONE</span>
              <span className="absolute top-0 bottom-0 -right-2 -left-2 my-auto h-1 bg-red-400 rounded-full rotate-5"></span>
            </span>{" "}
            WITH US!
          </div>
        </div>
      </div>
    </main>
  );
}
