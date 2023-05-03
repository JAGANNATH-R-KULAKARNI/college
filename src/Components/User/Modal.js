import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../Supabase";
import Cookies from "js-cookie";

export default function ScrollDialog(props) {
  const [open, setOpen] = React.useState(true);
  const [scroll, setScroll] = React.useState("paper");
  const [msg, setMsg] = React.useState("");
  const [chats, setChats] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
    props.setModal(false);
  };

  async function getChats() {
    setLoading(true);
    const { data, error } = await supabase
      .from("chats")
      .select("*")
      .eq("phnum", Cookies.get("phnumH"))
      .eq("hospital", props.data.email)
      .order("created_at", { ascending: true });

    if (data) {
      console.log("CHATS");
      console.log(data);
      setChats(data);
      setLoading(false);
    }
  }
  React.useEffect(() => {
    // setInterval(() => {
    //   getChats();
    // }, 1000);
    getChats();
  }, []);

  async function sendChat() {
    if (msg.length == 0) {
      return;
    }
    const { data, error } = await supabase
      .from("chats")
      .insert([
        {
          phnum: Cookies.get("phnumH"),
          hospital: props.data.email,
          text: msg,
          isitme: 1,
        },
      ])
      .then((u) => {
        console.log("Pushed");
        // props.getRequests();
        // props.getHospitalDetails();
        setMsg("");
        getChats();
      })
      .catch((err) => {});
  }

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          Chat with "{props.data.name}"
        </DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <p style={{ textAlign: "center", fontStyle: "italic" }}>
              {" "}
              "A chat can help doctors better understand incoming emergency
              department patients' social needs"
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10px",
              }}
            >
              <button
                type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                style={{ backgroundColor: "black", color: "white" }}
                onClick={() => {
                  if (Cookies.get("patient-info")) {
                    let temp = JSON.parse(Cookies.get("patient-info"));
                    console.log(JSON.parse(Cookies.get("patient-info")));
                    if (temp) {
                      setMsg(`
                    Name : ${temp.name} |||
                    Age : ${temp.age} |||
                    Gender : ${temp.gender} |||
                    Previous Complications : ${temp.pc} |||
                    Contact Number : ${temp.phnum} |||
                    Availability Of Insurance : ${temp.aoin}
                    `);
                    }
                  }
                }}
              >
                Send Info
              </button>
              <a href={`tel:+91${props.data.contact}`}>
                <button
                  type="button"
                  class="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2"
                  style={{ backgroundColor: "#10B981" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                    style={{ marginRight: "10px" }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20.25 3.75v4.5m0-4.5h-4.5m4.5 0l-6 6m3 12c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z"
                    />
                  </svg>
                  Call {props.data.name}
                </button>
              </a>
            </div>
            <br />
            {loading ? (
              <h1 style={{ textAlign: "center", fontWeight: 900 }}>
                Loading chats...
              </h1>
            ) : null}
            {chats &&
              chats.length > 0 &&
              chats.map((item) => {
                return (
                  <div style={{ marginBottom: "10px" }}>
                    <div style={{ width: "100%", display: "flex" }}>
                      <div
                        style={{
                          width: item.isitme ? "20%" : "80%",
                          backgroundColor: item.isitme ? "white" : "#C5C5C5",
                          color: "white",
                          borderRadius: "10px",
                          borderBottomLeftRadius: "30px",
                          borderTopRightRadius: "30px",
                        }}
                      >
                        {!item.isitme && (
                          <p style={{ padding: "10px" }}>{item.text}</p>
                        )}
                      </div>
                      <div
                        style={{
                          width: item.isitme ? "80%" : "20%",
                          backgroundColor: item.isitme ? "#56C86E" : "white",
                          color: "white",
                          borderRadius: "10px",
                          borderBottomLeftRadius: "30px",
                          borderTopRightRadius: "30px",
                        }}
                      >
                        {item.isitme && (
                          <p style={{ padding: "10px" }}>{item.text}</p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <div style={{ width: "100%" }}>
            <label
              for="search"
              class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"></div>
              <input
                type="search"
                id="search"
                class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="We have an emergency pls send an ambulance..."
                required
                value={msg}
                onChange={(e) => {
                  setMsg(e.target.value);
                }}
              />

              <button
                type="submit"
                class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                style={{ backgroundColor: "black", color: "white" }}
                onClick={() => {
                  sendChat();
                }}
              >
                Send
              </button>
            </div>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}
