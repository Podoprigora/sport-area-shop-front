import React from 'react';

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__copyright">© {year} Sport Area online shop </div>
            </div>
        </footer>
    );
};

export default Footer;
