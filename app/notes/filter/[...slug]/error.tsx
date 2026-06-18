"use client";
type Props = {
  error: Error;
};
export default function ErrorRoute({ error }: Props) {
  return <p>Could not fetch note details. {error.message}</p>;
}
