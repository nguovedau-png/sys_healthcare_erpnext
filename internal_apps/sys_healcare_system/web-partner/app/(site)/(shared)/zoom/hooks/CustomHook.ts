import { useState, useEffect } from "react";

interface MeetingConfig {
  meetingNumber: string;
  userName: string;
  userEmail: string;
  passWord: string;
  role: number;
}

export const useSetting = (id: string, pwd: string, fullname: string, email: string): MeetingConfig | null => {
  const [mtConfig, setMtConfig] = useState<MeetingConfig | null>(null);

  useEffect(() => {
    if (id && pwd && fullname && email) {
      setMtConfig({
        meetingNumber: id,
        userName: fullname,
        userEmail: email,
        passWord: pwd,
        role: 0,
      });
    }
  }, [id, pwd, fullname, email]);

  return mtConfig;
};