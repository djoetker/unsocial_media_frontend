import "./Navbar.css"

function Navbar() {

  return (
    <div className="navbar_container">
        <section className="brandname_container">
          <p><span>un</span>social media</p>
        </section>
      <section className="searchbar_container">
        <input type="text" />
      </section>
    </div>
  )
};


export default Navbar;