import FileForm from "../../Components/Forms/FileForm";

function AdminHomePage() {
  const BaseURL = "http://localhost:3000/"; // api url
  console.log(BaseURL);
  return (
    <div>
      <h4 className="text-center">Choose file</h4>
      <FileForm />
    </div>
  );
}

export default AdminHomePage;
