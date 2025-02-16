import React, { useEffect, useState } from "react";
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
  const [dataOptions, setDataOptions] = useState([])
  const { register, handleSubmit, formState: { errors }, setValue, control } = useForm()
  // onsubmit useForm 
  const onSubmit = (data) => {
    if(options.length > 0)
    {
      alert("Form hợp lệ, call api ở thành công" + data)
      console.log(data)
    }else{
      alert("Phải có ít nhất 1 option thì mới hợp lệ, vui lòng thêm option")
    }
  }

  useEffect(() => {
    const newDataOptions = options.map(item => [
      item.title,
      item.discountType,
      item.quantity,
      item.amount ? item.amount : " - "
    ]);

    setDataOptions(newDataOptions)
  }, [options])

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


  const rows = [
    ["Single", "None", "1", "-"],
    ["Duo", "%discount", "2", "10%"],
  ];

  console.log(options)

  return (
    <>
      <Page hasSubtitleMaxWidth>
        <div style={{ marginBottom: "10px" }}>
          <Button icon={ArrowLeftIcon} size="large" />
        </div>
        <Grid>
          <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 7, lg: 7, xl: 7 }}>
            <LegacyCard title="Genneral" sectioned >
              <form action="" onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  name="campaign"
                  control={control}
                  rules={{ required: "Campaign is required" }}
                  render={({ field }) => (
                    <TextField
                      label="Campaign"
                      {...field}
                      value={field.value || Campaign} // Đảm bảo giá trị không bị undefined
                      onChange={(value) => field.onChange(value)} // Polaris yêu cầu cách này
                      autoComplete="off"
                    />
                  )}
                />
                {errors.campaign && <p style={{ color: "red" }}>{errors.campaign.message}</p>}
                <Controller
                  name="title"
                  control={control}
                  rules={{ required: "Title is required" }}
                  render={({ field }) => (
                    <TextField
                      label="Title"
                      {...field}
                      value={field.value || Title} // Đảm bảo không undefined
                      onChange={(value) => field.onChange(value)}
                      autoComplete="off"
                    />
                  )}
                />
                {errors.title && <p style={{ color: "red" }}>{errors.title.message}</p>}

                {/* Description Input */}
                <Controller
                  name="description"
                  control={control}
                  rules={{ required: "Description is required" }}
                  render={({ field }) => (
                    <TextField
                      label="Description"
                      {...field}
                      value={field.value || Description}
                      onChange={(value) => field.onChange(value)}
                      autoComplete="off"
                    />
                  )}
                />
                {errors.description && <p style={{ color: "red" }}>{errors.description.message}</p>}
                <div style={{ width: "100%", padding: "10px 0" }}>
                  <button>
                    save
                  </button>
                </div>
              </form>
            </LegacyCard>
            <LegacyCard title="Volume Discount rule" sectioned >
              {options.map((option, index) => (
                <Card sectioned key={option.id}>
                  <div style={{ justifyContent: "space-between", display: "flex" }}>
                    <div
                      style={{
                        width: "25%",
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

                    <Button variant="plain" icon={DeleteIcon} onClick={() => setOptions((op) => op.filter(x => x.id !== option.id))} />

                  </div>
                  <LegacyStack vertical spacing="loose">
                    <LegacyStack>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10%", paddingRight: "10px", paddingTop: "20px" }}>
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
                      </div>
                    </LegacyStack>

                    <LegacyStack>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10%", paddingRight: "10px", paddingBottom: "20px" }} >
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
                      </div>
                    </LegacyStack>
                  </LegacyStack>
                </Card>
              ))}
            </LegacyCard>

            <Card>
              <div style={{ textAlign: "center", marginTop: "12px" }}>
                <Button size="large" variant="primary" tone="critical" fullWidth onClick={handleAddOption}  >
                  + Add option
                </Button>
              </div>
            </Card>
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
                rows={dataOptions}
              />
            </LegacyCard>
          </Grid.Cell>
        </Grid>
      </Page>
    </>
  );
};

export default App;
