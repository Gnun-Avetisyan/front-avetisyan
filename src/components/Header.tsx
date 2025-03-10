import { useState, useEffect } from "react";
import ChevronDown from "../images/chevron-down.png";
import ChevronRight from "../images/chevron-right.png"
import Logo from "../images/logo.png";
import Hamburger from "../images/hamburger-menu-icon.png";
import Search from "../images/search-icon.png";
import CloseIcon from "../images/close-icon.png"

const menuItems = [
    { title: "Demos", submenu: [{ title: "Demos Header" }, { title: "Demos Layout" }] },
    { title: "Post", submenu: [{ title: "Post Header" }, { title: "Post Layout" }, { title: "Share Buttons" }, { title: "Gallery Post" }, { title: "Video Post" }] },
    { title: "Features", submenu: [{ title: "Features Header" }, { title: "Features Layout" }] },
    { title: "Categories", submenu: [{ title: "Categories Header" }, { title: "Categories Layout" }] },
    { title: "Shop", submenu: [{ title: "Shop Header" }, { title: "Shop Layout" }] },
    { title: "Buy Now", submenu: [] },
];

interface NavbarProps {
    searchTerm: string;
    handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
    showSearch: boolean;
    setShowSearch: (value: boolean) => void;
}

export default function Navbar({ searchTerm, handleSearch, showSearch, setShowSearch }: NavbarProps) {
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [showHeader, setShowHeader] = useState<boolean>(true);


    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        let lastScrollY = window.scrollY; // Store the last scroll position

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY === 0) {
                setShowHeader(true);
            } else if (currentScrollY > 200 && currentScrollY < lastScrollY) {
                setShowHeader(true);
            } else if (currentScrollY > 200 && currentScrollY > lastScrollY) {
                setShowHeader(false);
            }

            lastScrollY = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.classList.add("menu-open");
        } else {
            document.body.classList.remove("menu-open");
        }
    }, [isMenuOpen]);


    return (
        <header className={`header-section ${showHeader ? "visible" : "hidden"}`}>
            {isMobile && isMenuOpen && <div className="overlay show" onClick={() => setIsMenuOpen(false)}></div>}
            <div className="container">
                <div className="upper-nav">
                    <div>
                        {isMobile && (
                            <button onClick={() => setIsMenuOpen(true)}>
                                <img src={Hamburger} alt="Hamburger Icon" />
                            </button>
                        )}
                    </div>
                    <a href="/">
                        <img src={Logo} alt="Logo" />
                    </a>
                    <div className="search-area">
                        {showSearch && (
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={handleSearch}
                                placeholder="Search..."
                                className="search-input"
                            />
                        )}
                        <button onClick={() => setShowSearch(!showSearch)}>
                            <img src={Search} alt="Search Icon" />
                        </button>
                    </div>
                </div>
            </div>

            {!isMobile && (
                <div className="navbar-container">
                    <div className="container">
                        <nav className="desktop-navbar">
                            <ul className="nav-list">
                                {menuItems.map((item) => (
                                    <li key={item.title} className="nav-item">
                                        <button className="nav-link">
                                            {item.title}
                                            {item.submenu.length > 0 && <img src={ChevronDown} alt="Chevron Down" />}
                                        </button>

                                        {item.submenu.length > 0 && (
                                            <ul className="dropdown-menu">
                                                {item.submenu.map((subItem) => (
                                                    <li key={subItem.title} className="dropdown-item">
                                                        <span>{subItem.title}</span>
                                                        <img src={ChevronRight} alt="Chevron Right" />
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </div>
            )}

            {isMobile && (
                <div className={`mobile-menu ${isMenuOpen ? "open" : ""}`}>
                    <div className="mobile-logo-section d-flex justify-content-between">
                        <a href="/">
                            <img src={Logo} alt="Logo" />
                        </a>
                        <button className="close-menu" onClick={() => setIsMenuOpen(false)}>
                            <img src={CloseIcon} alt="Close Icon" />
                        </button>
                    </div>
                    <hr />
                    <ul className="mobile-nav-list">
                        {menuItems.map((item) => (
                            <li key={item.title} className="mobile-nav-item">
                                <button className="mobile-nav-link" onClick={() => setOpenDropdown(openDropdown === item.title ? null : item.title)}>
                                    {item.title}
                                    {item.submenu.length > 0 && <img src={ChevronDown} alt="Chevron Down" />}
                                </button>
                                {openDropdown === item.title && item.submenu.length > 0 && (
                                    <ul className="mobile-dropdown-menu">
                                        {item.submenu.map((subItem) => (
                                            <li key={subItem.title} className="mobile-dropdown-item">
                                                {subItem.title}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </header>
    );
}
