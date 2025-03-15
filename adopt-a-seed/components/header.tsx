import Link from "next/link";

export default function Header() {
  return (
    <header className="h-16">
      <div className="flex items-center justify-between p-4">
        <Link href="/">
          <h1 className="text-2xl font-bold">adopt-a-seed</h1>
        </Link>

        <div className="flex items-center">
          <div className="ml-2">100</div>
          <div>
            <svg className="ml-2 w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              {/* Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. */}
              <path d="M512 32c0 113.6-84.6 207.5-194.2 222c-7.1-53.4-30.6-101.6-65.3-139.3C290.8 46.3 364 0 448 0l32 0c17.7 0 32 14.3 32 32zM0 96C0 78.3 14.3 64 32 64l32 0c123.7 0 224 100.3 224 224l0 32 0 160c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-160C100.3 320 0 219.7 0 96z" />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
}
