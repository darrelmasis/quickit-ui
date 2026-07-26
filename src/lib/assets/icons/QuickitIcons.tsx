export function PlusIcon({ className }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 448 512" className={className}>
      <path
        fill="currentColor"
        d="M248 72c0-13.3-10.7-24-24-24s-24 10.7-24 24v160H40c-13.3 0-24 10.7-24 24s10.7 24 24 24h160v160c0 13.3 10.7 24 24 24s24-10.7 24-24V280h160c13.3 0 24-10.7 24-24s-10.7-24-24-24H248V72Z"
      />
    </svg>
  );
}

export function SpinnerIcon({ className }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 512 512" className={className}>
      <path
        fill="currentColor"
        d="M457 372c11.5 6.6 26.3 2.7 31.8-9.3C503.7 330.2 512 294.1 512 256C512 122.7 410.1 13.2 280 1.1 266.8-.1 256 10.7 256 24s10.8 23.9 24 25.4C383.5 61.2 464 149.2 464 256c0 29.3-6.1 57.3-17 82.6-5.3 12.2-1.5 26.8 10 33.5Z"
      />
    </svg>
  );
}

function CheckMarkPath({ className }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 448 512" className={className}>
      <path
        fill="currentColor"
        d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0Z"
      />
    </svg>
  );
}

export function CheckStrokeIcon({ className }) {
  return <CheckMarkPath className={className} />;
}

export function CheckFillIcon({ className }) {
  return <CheckMarkPath className={className} />;
}

export function CheckIcon(props) {
  return <CheckFillIcon {...props} />;
}

export function MinusIcon({ className }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 448 512" className={className}>
      <path
        fill="currentColor"
        d="M432 256c0 13.3-10.7 24-24 24H40c-13.3 0-24-10.7-24-24s10.7-24 24-24h368c13.3 0 24 10.7 24 24Z"
      />
    </svg>
  );
}

function XMarkPath({ className }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 384 512" className={className}>
      <path
        fill="currentColor"
        d="M345 137c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-119 119L73 103c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l119 119L39 375c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l119-119L311 409c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-119-119L345 137z"
      />
    </svg>
  );
}

export function ClearIcon({ className }) {
  return <XMarkPath className={className} />;
}

export function EyeIcon({ className }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 576 512" className={className}>
      <path
        fill="currentColor"
        d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80ZM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1 3.3 7.9 3.3 16.7 0 24.6-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480S142.5 443.2 95.4 399.4C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6ZM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0 1.3 5.1 2 10.5 2 16 0 35.3-28.7 64-64 64-5.5 0-10.9-.7-16-2 0 .7 0 1.3 0 2 0 44.2 35.8 80 80 80Zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256Z"
      />
    </svg>
  );
}

export function EyeOffIcon({ className }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 640 512" className={className}>
      <path
        fill="currentColor"
        d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4 3.3-7.9 3.3-16.7 0-24.6-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1Zm151 118.3C226 97.7 269.5 80 320 80c65.2 0 118.8 29.6 159.9 67.7C518.4 183.5 545 226 558.6 256c-12.6 28-36.6 66.8-70.9 100.9l-53.8-42.2c9.1-17.6 14.2-37.5 14.2-58.7 0-70.7-57.3-128-128-128-32.2 0-61.7 11.9-84.2 31.5l-46.1-36.1Zm205.1 160.8-81.5-63.9c4.2-8.5 6.6-18.2 6.6-28.3 0-5.5-.7-10.9-2-16 .7 0 1.3 0 2 0 44.2 0 80 35.8 80 80 0 9.9-1.8 19.4-5.1 28.2Zm9.4 130.3C378.8 425.4 350.7 432 320 432c-65.2 0-118.8-29.6-159.9-67.7C121.6 328.5 95 286 81.4 256c8.3-18.4 21.5-41.5 39.4-64.8L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6 14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5l-41.9-33ZM192 256c0 70.7 57.3 128 128 128 13.3 0 26.1-2 38.2-5.8L302 334c-23.5-5.4-43.1-21.2-53.7-42.3l-56.1-44.2c-.2 2.8-.3 5.6-.3 8.5Z"
      />
    </svg>
  );
}

export function CloseIcon({ className }) {
  return <XMarkPath className={className} />;
}

export function ChevronDownIcon({ className }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 512 512" className={className}>
      <path
        fill="currentColor"
        d="M239 401c9.4 9.4 24.6 9.4 33.9 0L465 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-175 175L81 175c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9L239 401z"
      />
    </svg>
  );
}

export function ChevronRightIcon({ className }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 320 512" className={className}>
      <path
        fill="currentColor"
        d="M305 239c9.4 9.4 9.4 24.6 0 33.9L113 465c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l175-175L79 81c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L305 239z"
      />
    </svg>
  );
}

export function CopyIcon({ className }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 448 512" className={className}>
      <path
        fill="currentColor"
        d="M384 336H192c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16h140.1L400 115.9V320c0 8.8-7.2 16-16 16ZM192 384h192c35.3 0 64-28.7 64-64V115.9c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1H192c-35.3 0-64 28.7-64 64V320c0 35.3 28.7 64 64 64ZM64 128c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H256c35.3 0 64-28.7 64-64V416H272v32c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192c0-8.8 7.2-16 16-16H96V128H64Z"
      />
    </svg>
  );
}
