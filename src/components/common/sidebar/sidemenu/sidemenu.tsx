export const MENUITEMS = [
  // {
  //   menutitle: "DASHBOARD",
  //   Items: [
  //     {
  //       icon: <i className="side-menu__icon bx bx-home"></i>,
  //       type: "link",
  //       Name: "",
  //       active: false,
  //       selected: false,
  //       title: "Dashboards",
  //       badge: "",
  //       class: "badge bg-warning-transparent ms-2",
  //       path: `${import.meta.env.BASE_URL}dashboards/crm`,
  //     },
  //   ],
  // },
  {
    menutitle: "PDF",
    Items: [
      {
        icon: <i className="side-menu__icon bi bi-filetype-pdf mb-2"></i>,
        type: "link",
        Name: "",
        active: false,
        selected: false,
        title: "Pdf Uploader",
        badge: "",
        class: "badge bg-warning-transparent ms-2",
        path: `${import.meta.env.BASE_URL}upload-pdf`,
        // children: [
        //   {
        //     path: `${import.meta.env.BASE_URL}productdetails/productdetails`,
        //     title: "Add Product",
        //     type: "link",
        //     active: false,
        //     selected: false,
        //   },
        //   {

        //     title: "Product Addition",
        //     type: "link",
        //     active: false,
        //     selected: false,
        //   },
        // ],
      },
      {
        icon: <i className="side-menu__icon bi bi-telephone-forward mb-2"></i>,
        type: "link",
        Name: "",
        active: false,
        selected: false,

        badge: "",
        // badgetxt: "12",
        class: "badge bg-warning-transparent ms-2",

        title: "CallStatus-Inbound",

        path: `${import.meta.env.BASE_URL}hourly-call`,
      },

      {
        icon: <i className="side-menu__icon bi bi-telephone-x mb-2"></i>,
        type: "link",
        Name: "",
        active: false,
        selected: false,

        badge: "",
        // badgetxt: "12",
        class: "badge bg-warning-transparent ms-2",

        title: "CallStatus-OutBound",

        path: `${import.meta.env.BASE_URL}inboundcall`,
      },
      {
        icon: <i className="side-menu__icon bi bi-file-earmark-break mb-2"></i>,
        type: "link",
        Name: "",
        active: false,
        selected: false,

        badge: "",
        // badgetxt: "12",
        class: "badge bg-warning-transparent ms-2",

        title: "District Report",

        path: `${import.meta.env.BASE_URL}districtreport`,
      },
      {
        icon: <i className="side-menu__icon bi bi-file-excel mb-2"></i>,
        type: "link",
        Name: "",
        active: false,
        selected: false,

        badge: "",
        // badgetxt: "12",
        class: "badge bg-warning-transparent ms-2",

        title: "Disposition Report",

        path: `${import.meta.env.BASE_URL}disposition`,
      },

      {
        icon: <i className="side-menu__icon bi bi-telephone-outbound mb-2"></i>,
        type: "link",
        Name: "",
        active: false,
        selected: false,

        badge: "",
        // badgetxt: "12",
        class: "badge bg-warning-transparent ms-2",

        title: "Sample Call",

        path: `${import.meta.env.BASE_URL}hourly-call`,
      },
    ],
  },
];
