import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <header className="header position-static">
      <nav className="navbar navbar-expand-lg navbar-light navbar-main">
        <div className="left-item">
          <Link className="navbar-brand logo" href="/">
            <img className="img-fluid" src="/img/logo.png" alt="logo" />
          </Link>
        </div>

        <div className="right-item p-0">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto align-items-center">
              <li className="nav-item active-link">
                <Link className="nav-link" href="/game1">
                  <strong>Game 1: Matching - Ghép cặp</strong>
                  <p>Ghép cặp câu hỏi và câu trả lời tương ứng</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/game2">
                  <strong>Game 2: Drag the words - Điền vào chỗ trống</strong>
                  <p>Kéo thả ô đáp án vào chỗ trống</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/game3">
                  <strong>Game 3: True/False - Đúng/Sai</strong>
                  <p>Chọn đúng / sai cho nhận định</p>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;