import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Page, Grid, LegacyCard, Button, TextField, DataTable, Select, LegacyStack, Card, Icon } from '@shopify/polaris';
import { ArrowLeftIcon, DeleteIcon } from '@shopify/polaris-icons';



const App = () => {
  const [Campaign, setCampaign] = useState("Volume discount #2")
  const [Title, setTitle] = useState("Buy more and save")
  const [Description, setDescription] = useState("Apply for all product in store")
  const [options, setOptions] = useState([
    { id: 1, title: "Single", subtitle: "Standard price", label: "", quantity: "1", discountType: "None", amount: "" },
    { id: 2, title: "Duo", subtitle: "Save 10%", label: "Popular", quantity: "2", discountType: "% discount", amount: "10" },
  ]);

  const discountOptions = [
    { label: "None", value: "None" },
    { label: "% discount", value: "% discount" },
  ];

  const handleChange = (id, field, value) => {
    setOptions((prev) =>
      prev.map((option) => (option.id === id ? { ...option, [field]: value } : option))
    );
  };

  const handleAddOption = () => {
    setOptions((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        title: "",
        subtitle: "",
        label: "",
        quantity: "",
        discountType: "None",
        amount: "",
      },
    ]);
  };

  const handleRemoveOption = (id) => {
    setOptions((prev) => prev.filter((option) => option.id !== id));
  };

  const rows = [
    ["Single", "None", "1", "-"],
    ["Duo", "%discount", "2", "10%"],
  ];

  return (
    <>
      <Page hasSubtitleMaxWidth>
        <div style={{ marginBottom: "10px" }}>
          <Button icon={ArrowLeftIcon} size="large" />
        </div>
        <Grid>
          <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 7, lg: 7, xl: 7 }}>
            <LegacyCard title="Genneral" sectioned>
              <TextField
                label="Campaign"
                value={Campaign}
                // onChange={(newValue) => setInputValue(newValue)}
                autoComplete="off"
              />
              <TextField
                label="Title"
                value={Title}
                // onChange={(newValue) => setInputValue(newValue)}
                autoComplete="off"
              />
              <TextField
                label="Description"
                value={Description}
                // onChange={(newValue) => setInputValue(newValue)}
                autoComplete="off"
              />
            </LegacyCard>
            <LegacyCard title="Volume Discount rule" sectioned >
              {options.map((option, index) => (
                <Card sectioned key={option.id}>
                  <div style={{justifyContent : "space-between", display : "flex"}}>
                    <div
                      style={{
                        width : "25%",
                        backgroundColor: "#e64a19",
                        color: "#fff",
                        padding: "8px 12px",
                        fontWeight: "bold",
                        borderRadius: "0 0 10px 0",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span>OPTION {index + 1}</span>
                    </div>

                    <Button  variant="plain" icon={DeleteIcon} onClick={() => alert("mày muốn xóa à ")} />

                  </div>
                  <LegacyStack vertical spacing="loose">
                    <LegacyStack>
                      <TextField
                        label="Title"
                        value={option.title}
                        onChange={(value) => handleChange(option.id, "title", value)}
                      />
                      <TextField
                        label="Subtitle"
                        value={option.subtitle}
                        onChange={(value) => handleChange(option.id, "subtitle", value)}
                      />
                      <TextField
                        label="Label (optional)"
                        value={option.label}
                        onChange={(value) => handleChange(option.id, "label", value)}
                      />
                    </LegacyStack>

                    <LegacyStack>
                      <TextField
                        label="Quantity"
                        value={option.quantity}
                        onChange={(value) => handleChange(option.id, "quantity", value)}
                        type="number"
                      />
                      <Select
                        label="Discount type"
                        options={discountOptions}
                        onChange={(value) => handleChange(option.id, "discountType", value)}
                        value={option.discountType}
                      />
                      <TextField
                        label="Amount"
                        value={option.amount}
                        onChange={(value) => handleChange(option.id, "amount", value)}
                        type="number"
                        suffix="%"
                        disabled={option.discountType === "None"}
                      />
                    </LegacyStack>
                  </LegacyStack>
                </Card>
              ))}

              <div style={{ textAlign: "center", marginTop: "12px" }}>
                <Button primary fullWidth onClick={handleAddOption}  > 
                  + Add option
                </Button>
              </div>
            </LegacyCard>
          </Grid.Cell>
          <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 5, lg: 5, xl: 5 }}>
            <LegacyCard title="Preview" sectioned>
              <div style={{ textAlign: "center", fontWeight: "bold", fontSize: "16px" }}>
                Buy more and save
              </div>
              <div style={{ textAlign: "center", marginBottom: "10px" }}>
                Apply for all products in store
              </div>
              <DataTable
                columnContentTypes={["text", "text", "numeric", "text"]}
                headings={["Title", "Discount Type", "Quantity", "Amount"]}
                rows={rows}
              />
            </LegacyCard>
          </Grid.Cell>
        </Grid>
      </Page>
    </>
  );
};

export default App;
