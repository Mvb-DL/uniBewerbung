import React from 'react';
import CookieConsent from "react-cookie-consent";

export default function Cookie_Consent() {

    return(

        <CookieConsent
                        location="bottom"
                        buttonText="Cookies akzeptieren"
                        declineButtonText="Nicht akzeptieren"
                        cookieName="myAwesomeCookieName2"
                        style={{ background: "#6225E6" }}
                        buttonStyle={{ color: "#6225E6", fontSize: "15px", fontWeight: "700", backgroundColor: "#fff", border: "none", borderRadius: "8px", fontFamily: "Hack, sans-serif"}}
                        expires={150}
                      >
                        Mein Provider erstellt automatisch Server-Logfiles der Besucher.{" "}
                        <span style={{ fontSize: "10px" }}><a href="./docs/datenschutzerklearung.pdf" target='_blank'>Datenschutzerklärung</a></span>
        </CookieConsent>

    )
}