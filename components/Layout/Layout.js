import Head from "next/head";
import Navbar from "../Navbar/Navbar.js";
const Layout = ({ name, authenticated, profile, children }) => {
    return (
        <>
            <Head>
                <link rel="stylesheet" href="https://bootswatch.com/4/minty/bootstrap.min.css" />

                <script
                    src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
                    integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
                    crossOrigin="anonymous"
                ></script>
                <script
                    src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
                    integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
                    crossOrigin="anonymous"
                ></script>
                <script
                    src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"
                    integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI"
                    crossOrigin="anonymous"
                ></script>
            </Head>
            <div>
                <Navbar profile={profile} name={name} authenticated={authenticated} />
                <div className="page-wrapper">{children}</div>
            </div>
        </>
    );
};

export default Layout;
