function Layout({ children }) {
  return (
    <div className="container flex flex-col mx-auto min-h-screen bg-slate-50 max-w-5xl">
      <main className="flex-1">{children}</main>
    </div>
  );
}

export default Layout;
