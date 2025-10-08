namespace com.scb.intellibase;

entity PromptsData {
    category      : String;
    product       : String;
    key prompt    : String;
    description   : String;
    //   parameter columns
    selProduct    : String;
    ipCountry     : String;
    selModel      : String;
    selCouponType : String;
    selMetric     : String;
    selCOBDate    : String;
    selAttribute  : String;
    ipISIN        : String;
    ipMonthYear   : String;
    ipPortfolio   : String;
    // keyword columns
    keyProduct    : String;
    keyCountry    : String;
    keyModel      : String;
    keyCouponType : String;
    keyMetric     : String;
    keyCOBDate    : String;
    keyAttribute  : String;
    keyISIN       : String;
    keyMonthYear  : String;
}
