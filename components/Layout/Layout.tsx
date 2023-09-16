const Layout = ({ children }) => (
  <div>
    <nav>
      <span>
        <a href="/">My Next.js Blog</a>
      </span>
    </nav>
    <main>{children}</main>
  </div>
);

export default Layout;
