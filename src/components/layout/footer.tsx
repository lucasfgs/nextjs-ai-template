export function Footer() {
  return (
    <footer className="text-muted-foreground border-t py-4 text-center text-xs">
      &copy; {new Date().getFullYear()} {process.env.NEXT_PUBLIC_APP_NAME ?? 'My App'}. All rights
      reserved.
    </footer>
  )
}
