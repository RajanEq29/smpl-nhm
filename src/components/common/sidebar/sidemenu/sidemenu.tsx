/* eslint-disable linebreak-style */
export const MENUITEMS = [
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
      },
      {
        icon: <i className="side-menu__icon bi bi-telephone-forward mb-2"></i>,
        type: "link",
        Name: "",
        active: false,
        selected: false,
        badge: "",
        class: "badge bg-warning-transparent ms-2",
        title: "Call Status-Inbound",
        path: `${import.meta.env.BASE_URL}hourly-call`,
      },

      {
        icon: <i className="side-menu__icon bi bi-telephone-x mb-2"></i>,
        type: "link",
        Name: "",
        active: false,
        selected: false,
        badge: "",
        class: "badge bg-warning-transparent ms-2",
        title: "Call Status-OutBound",
        path: `${import.meta.env.BASE_URL}outboundcall`,
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
        icon: <i className="side-menu__icon bi bi-telephone-outbound "></i>,
        type: "link",
        Name: "",
        active: false,
        selected: false,

        badge: "",
        // badgetxt: "12",
        class: "badge bg-warning-transparent ms-2",

        title: "Sample Call",

        path: `${import.meta.env.BASE_URL}samplecall`,
      },
      {
        icon: <i className="bi bi-asterisk mb-2 side-menu__icon "></i>,
        type: "link",
        Name: "",
        active: false,
        selected: false,

        badge: "",
        // badgetxt: "12",
        class: "badge bg-warning-transparent ms-2",

        title: "Appointment Status",

        path: `${import.meta.env.BASE_URL}appointment`,
      },
      {
        icon: <i className="side-menu__icon bi bi-file-earmark-text mb-2"></i>,
        type: "link",
        Name: "",
        active: false,
        selected: false,

        badge: "",
        // badgetxt: "12",
        class: "badge bg-warning-transparent ms-2",

        title: "Satisfaction status",

        path: `${import.meta.env.BASE_URL}satisfaction`,
      },
    ],
  },
];
