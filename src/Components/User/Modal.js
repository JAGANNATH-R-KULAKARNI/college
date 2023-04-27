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

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
    props.setModal(false);
  };

  async function getChats() {
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
    }
  }
  React.useEffect(() => {
    setInterval(() => {
      getChats();
    }, 1000);
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
            <br />
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
