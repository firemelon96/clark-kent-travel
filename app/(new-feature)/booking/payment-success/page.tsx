const SuccessPage = async () => {
  const data = await fetch(
    "https://gnat-poetic-uniquely.ngrok-free.app/api/webhook/xendit",
  );

  return (
    <div>
      <h1>Successful Payment</h1>

      {JSON.stringify(data)}
    </div>
  );
};

export default SuccessPage;
