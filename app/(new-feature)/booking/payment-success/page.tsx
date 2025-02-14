const SuccessPage = async () => {
  const data = await fetch(
    "https://clark-kent-travel-git-update-firemelon96s-projects.vercel.app/api/webhook/receive_callbabck",
  );

  return (
    <div>
      <h1>Successful Payment</h1>

      {JSON.stringify(data)}
    </div>
  );
};

export default SuccessPage;
