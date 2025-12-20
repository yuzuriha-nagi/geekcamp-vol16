
// 画像の警告アイコン（三角）を再現するSVGコンポーネントです
export const WarningIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    // xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.241 4.5-2.599 4.5H4.645c-2.358 0-3.753-2.5-2.599-4.5l7.355-12.748ZM12 9a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9.75A.75.75 0 0 1 12 9Zm0 6a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z"
      clipRule="evenodd"
    />
  </svg>
);