import { useEffect, useState } from "react";
import logo from './logo.png';
import seclogo from './seclogo.png';
import './navbar.css';
import Logout from "../../Config/firebase";
import 'remixicon/fonts/remixicon.css';
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../../Config/firebase";
function Navbar({ user }) {

    const uid = user?.uid
    const [dropper, setDropper] = useState(false)
    const navigate = useNavigate()
    const [useremail, setuseremail] = useState('login');
    const [UserDetail, setUserDetail] = useState([])
    let rotation
    {
        dropper
            ?
            rotation = '180deg'
            :
            rotation = '0deg'
    }

    useEffect(() => {
        getUserDetail();
    }, [uid]);  // Include uid in the dependency array

    async function getUserDetail() {
        if (uid) {
            const res = await getUserInfo(uid);
            setUserDetail(res);
        }
    }
    // console.log(user);
    useEffect(() => {
        setuseremail(user ? user.displayName : 'login')
    }, [user])

    return (
        <div>
            <div className="maindiv">
                <img className="logoimg" src={logo} alt="" />
                <button className="btnn"><i class="ri-car-line"></i></button><p>MOTORS</p>
                <button className="btnn"><i class="ri-building-line"></i></button><p>PROPERTY</p>
            </div>
            <div className="inputdiv">
                <img className="seclogo" src={seclogo} alt="" />
                <form className="locationoption" action="#">

                    <select className="locationoption" name="languages" id="lang">
                        <option value="pakistan">pakistan</option>
                        <option value="karachi">karachi</option>
                        <option value="peshawaer">peshawaer</option>
                        <option value="kpk">kpk</option>
                        <option value="lahore">lahore</option>
                        <option value="queta#">quetta</option>

                    </select>

                </form>
                <div className="inputt">
                    <input type="email" className="Input" id="Email" name="Email" placeholder="Find Cars, Mobile Phones and more..." autoComplete="off" />
                    <button className="button--submit" ><i class="ri-search-line"></i></button>
                </div>
                <div className="authBtn">
                    {
                        user
                            ?
                            <div className="profile">
                                <img className="chaticon" width={'15%'}  src="	https://www.olx.com.pk/assets/iconChat_noinline.31f5df4a6a21fc770ed6863958662677.svg" alt="" />
                                <img className="notificationicon" width={'15%'} src="	https://www.olx.com.pk/assets/iconNotifications_noinline.4444f6b42acbe30d772d80ef1225f574.svg" alt="" />
                                <div className="Dp" onClick={() => { setDropper(!dropper) }}>
                                    <img width={40} style={{ borderRadius: '100%' }} src={user.photoURL} alt="" />
                                    <i style={{ rotate: rotation }} className="fa-solid fa-chevron-down"></i>
                                </div>
                            </div>
                            :

                            <span className='LoginSpan' onClick={() => navigate("/login")} >login</span>

                    }
                </div>
                <button className="sellbtn" onClick={() => navigate(`/sellpro`)}>sell</button>
                {user
                    ?
                    dropper
                        ?
                        <div className="lastPart animated" style={{ zIndex: '65' }}>
                            <div className="dropdownDiv">
                                <div className="Name">
                                    <img src={user.photoURL} width={56} alt="" />
                                    <div>
                                        <span style={{ fontSize: '12px' }}>Hello,</span>
                                        <br />
                                        <span style={{ fontSize: '18px', fontWeight: '900' }}>{user ? user.displayName : <></>}</span>
                                        <br />
                                        <p>view and edit your profile</p>
                                    </div>
                                </div>
                                <div className="FButton" onClick={() => { navigate('/favourite'), setDropper(false) }}>
                                    <i className="fa-regular fa-heart"></i>
                                    <span>Favourite & Saved Searches</span>
                                </div>

                                <div className="FButton" onClick={Logout}>
                                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                                    <span>Logout</span>
                                </div>
                            </div>
                        </div>
                        :
                        <></>

                    : <></>}




            </div>
        </div>
    );
}

export default Navbar;


