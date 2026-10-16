// Page transition: the template remounts on every navigation, replaying a CSS
// fade-lift. CSS (not JS) so content is visible even before hydration.
// "backwards", not "both": a transform animation that stays filled turns this
// div into the containing block for position:fixed popups (video, lightbox).
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="animate-[page-in_0.8s_cubic-bezier(0.16,1,0.3,1)_backwards]">{children}</div>;
}
