import { Default } from 'components/layouts/Default';
import { useEffect, useState } from "react";
import { Heading , Center} from '@chakra-ui/react';
import { huddleIframeApp, HuddleIframe } from "@huddle01/huddle01-iframe";
import { type } from 'os';


function Connect() {
  const [walletAddress, setWalletAddress] = useState("");

  const iframeConfig = {
    roomUrl: "https://iframe.huddle01.com/test-room",
    height: "600px",
    width: "100%",
  };




//   useEffect(() => {
//     huddleIframeApp.on("peer-join", (data) =>
//       console.log({ iframeData: data })
//     );
//     huddleIframeApp.on("peer-left", (data) =>
//       console.log({ iframeData: data })
//     );
//   }, []);

  return (

    <div>
      <Default pageName="proposalMarketPlace">
      <div className="flex min-h-screen ">

        <main className="flex flex-1 flex-col p-5">

          <div className="App">
            <div className="container">
              <div>
              <Center h='100px' color='white'>
                <Heading >Connect One to One Meeting before the final Deal 💼</Heading>
               </Center>
                <br />

              </div>
              <div className="frame">
                <HuddleIframe config={iframeConfig} />
              </div>

              <br />

            </div>
          </div>
        </main>
      </div>
      </Default>
    </div>

  );
}

export default Connect;

