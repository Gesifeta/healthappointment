const Reports = () => {

    return (
        <div style={{ border: "2px solid red", height: "900px" }} >

            <object
                data="/report.pdf"
                type="application/pdf"
                style={{
                    width: "100%",
                    height: "100vh"
                }}
                title="Embedded PDF Viewer"
            >
                <iframe
                ><p>
                        Your browser does not support PDFs.
                        <a href="/report.pdf">Download the PDF</a>
                    </p>
                </iframe>
            </object>

        </div>
    )
}

export default Reports