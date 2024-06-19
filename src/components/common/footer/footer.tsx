import  { FC , Fragment} from 'react';

interface FooterProps {}

const Footer: FC<FooterProps> = () => {
    return(
  <Fragment>
        <footer className="footer mt-auto py-3 bg-white text-center">
            <div className="container">
                <span className="text-muted fs-14 fw-semibold"> Dr.Odin</span>
            </div>
        </footer>
  </Fragment>
);
};

export default Footer;
