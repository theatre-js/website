const textBodyStyle =
  'prose docs md:mb-8 md:mx-0 prose prose-gray mb-4 w-full grow pb-8  prose-a:font-normal prose-code:font-normal prose-code:before:content-none prose-code:after:content-none dark:prose-invert dark:prose-hr:border-gray-800 '

export const TextBody: React.FC<
  React.PropsWithChildren<{ children?: React.ReactNode | string; className?: string }>
> = ({ children, className }) => {
  return (
    <div className={`${className} ${textBodyStyle} word-spacing-body text-body-mobile md:text-body-desktop`}>
      {children}
    </div>
  )
}
