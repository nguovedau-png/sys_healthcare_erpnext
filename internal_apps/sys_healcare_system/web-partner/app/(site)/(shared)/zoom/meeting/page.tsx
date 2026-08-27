'use client';

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import _ from "lodash";
import { useSetting } from "../hooks/CustomHook";

interface ApiKeys {
  apiKey: string;
  apiSecret: string;
}

interface MeetConfig {
  apiKey: string;
  meetingNumber: string;
  userName: string;
  userEmail: string;
  passWord: string;
  role: number;
}

let apiKeys: ApiKeys = {
  apiKey: process.env.NEXT_PUBLIC_ZOOM_API_KEY || "",
  apiSecret: process.env.NEXT_PUBLIC_ZOOM_API_SECRET_KEY || "",
};

import { Suspense } from 'react';

const MeetingContent: React.FC = () => {
  const [ZoomMtg, setZoomMtg] = useState<any>(null);
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const pwd = searchParams.get('pwd');
  const fullname = searchParams.get('fullname');
  const email = searchParams.get('email');

  const mtConfig = useSetting(id || "", pwd || "", fullname || "", email || "");

  const joinMeeting = (signature: string, meetConfig: MeetConfig): void => {
    if (!ZoomMtg) return;

    ZoomMtg.init({
      leaveUrl: "http://localhost:3000/",
      isSupportAV: true,
      success: (success: any) => {
        console.log("Init Success ", success);
        ZoomMtg.join({
          meetingNumber: meetConfig.meetingNumber,
          userName: meetConfig.userName,
          signature: signature,
          apiKey: apiKeys.apiKey,
          passWord: meetConfig.passWord,
          success: (success: any) => {
            console.log(success);
          },
          error: (error: any) => {
            console.log(error);
          },
        });
      },
    });
  };

  useEffect(() => {
    const initializeZoom = async () => {
      try {
        const ZoomMtgModule = await import('@zoomus/websdk');
        const { ZoomMtg } = ZoomMtgModule;

        ZoomMtg.setZoomJSLib('https://source.zoom.us/2.7.0/lib', '/av');
        ZoomMtg.preLoadWasm();
        // ZoomMtg.prepareJssdk(); // Commented out as this method doesn't exist in current version
        setZoomMtg(ZoomMtg);

        if (!_.isEmpty(mtConfig)) {
          ZoomMtg.generateSDKSignature({
            meetingNumber: mtConfig.meetingNumber,
            sdkKey: apiKeys.apiKey,
            sdkSecret: apiKeys.apiSecret,
            role: String(mtConfig.role),
            success: function (res: { result: string }) {
              console.log("res", res);
              setTimeout(() => {
                joinMeeting(res.result, { ...mtConfig, apiKey: apiKeys.apiKey });
              }, 1000);
            },
          });
        }
      } catch (error) {
        console.error('Failed to initialize Zoom:', error);
      }
    };

    initializeZoom();
  }, [mtConfig]);

  return <div className="Zoom">Zoom Testing</div>;
};

const Meeting: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading meeting...</div>}>
      <MeetingContent />
    </Suspense>
  );
};

export default Meeting;