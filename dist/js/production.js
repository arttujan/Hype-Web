!function(){
    window;const e=document.documentElement;
    if(e.classList.remove("no-js"),
    e.classList.add("js"),
    document.body.classList.contains("has-animations")) {
        (window.sr=ScrollReveal()).reveal(".reveal-on-scroll", {
            duration:600,distance:"20px",
            easing:"cubic-bezier(0.5, -0.01, 0, 1.005)",
            origin:"left",
        interval:100
    })
}
}();
// Config object to be passed to Msal on creation
const msalConfig = {
    auth: {
      clientId: "b23bcd24-02ec-4176-85b9-6f0050400394",
      authority: "b6d5681b-4a40-4d3a-8e7b-03a70d3991b6",
      redirectUri: "http://localhost:3000/",
    },
    cache: {
      cacheLocation: "sessionStorage", // This configures where your cache will be stored
      storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    }
};
// Add here the endpoints for MS Graph API services you would like to use.
const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
};