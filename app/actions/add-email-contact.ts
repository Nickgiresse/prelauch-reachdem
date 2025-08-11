"use server";

import { Resend } from 'resend';

const resend = new Resend("re_hvuUPSNG_34WnquFH7sH387viRzattRmu");
async function AddEmailContact(email: string) {
  
await resend.contacts.create({
  email,
  unsubscribed: false,
  audienceId: process.env.AUDIENCE_ID || "", // Replace with your audience ID
});
}
export default AddEmailContact