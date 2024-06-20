import  { FC , Fragment} from 'react';
import logo1 from "../../../../public/NHM Logo.png";
interface FooterProps {}

const Footer: FC<FooterProps> = () => {
    return(
  <Fragment>
        <footer className="footer mt-auto py-3 bg-white text-center">
            {/* <div className="container">
                <span className='text-black ms-2 fs-16' style={{  fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>राष्ट्रीय स्वास्थ्य मिशन</span>
            </div> */}
              <div className="main-sidebar-header">
  <img src={logo1} alt="logo" className="desktop-logo" style={{ width: "3%" }} />
  <span className='text-black ms-2 fs-16' style={{  fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>राष्ट्रीय स्वास्थ्य मिशन</span>
</div>
        </footer>
  </Fragment>
);
};

export default Footer;
