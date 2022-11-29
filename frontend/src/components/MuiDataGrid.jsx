import { useState } from "react";
import { format } from "date-fns";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "@mui/material";

const MuiDataGrid = (props) => {
  const [selectedPageSize, setSelectedPageSize] = useState(10);

  const rows = props.data.map((item, index) => {
    return {
      id: item.itemID,
      index: index + 1,
      itemID: item.itemID,
      systemSku: { sku: item.systemSku, itemID: item.itemID },
      description: item.description,
      reorderPoint: props.toShopData.find(
        (thing) => thing.itemID === item.itemID
      ).reorderPoint,
      reorderLevel: props.toShopData.find(
        (thing) => thing.itemID === item.itemID
      ).reorderLevel,
      toShopQOH: props.toShopData.find((thing) => thing.itemID === item.itemID)
        .qoh,
      fromShopQOH: props.fromShopData.find(
        (thing) => thing.itemID === item.itemID
      ).qoh,
      priceRetail: `$${item.pricing.default}`,
      priceMSRP: `$${item.pricing.msrp}`,
      priceOnline: `$${item.pricing.online}`,
      categoryName: item.category.categoryName,
      categoryID: item.category.categoryID,
      createdAt: format(new Date(item.createdAt), `yyyy, MMM do`),
      modifiedAt: format(new Date(item.modifiedAt), `yyyy, MMM do`),
      shopTimestamp: format(
        new Date(
          props.fromShopData.find(
            (thing) => thing.itemID === item.itemID
          ).timestamp
        ),
        `yyyy, MMM do`
      ),
    };
  });

  const columns = [
    {
      headerName: `# / ${props.data.length}`,
      field: "index",
    },
    {
      headerName: "Item ID",
      field: "itemID",
    },
    {
      headerName: "System SKU",
      field: "systemSku",
      width: 125,
      renderCell: (params) => (
        <Link
          href={`https://us.merchantos.com/?name=item.views.item&form_name=view&id=${params.value.itemID}&tab=details`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {params.value.sku}
        </Link>
      ),
    },
    {
      headerName: "Description",
      field: "description",
      flex: 1,
    },
    {
      headerName:
        props.toShopData.length > 0
          ? `Qty - ${props.toShopData[0].shopName}`
          : "Qty - You",
      field: "toShopQOH",
    },
    {
      headerName:
        props.fromShopData.length > 0
          ? `Qty - ${props.fromShopData[0].shopName}`
          : "Qty - Them",
      field: "fromShopQOH",
    },
    {
      headerName: "Reorder Point",
      field: "reorderPoint",
    },
    {
      headerName: "Reorder Level",
      field: "reorderLevel",
    },
    {
      field: "priceRetail",
      headerName: "Retail",
    },
    {
      field: "priceMSRP",
      headerName: "MSRP",
    },
    {
      field: "priceOnline",
      headerName: "Online",
    },
    {
      field: "categoryID",
      headerName: "ID",
    },
    {
      field: "categoryName",
      headerName: "Name",
    },
    {
      field: "createdAt",
      headerName: "Created",
    },
    {
      field: "modifiedAt",
      headerName: "Modified",
    },
    {
      field: "shopTimestamp",
      headerName: "Shop",
    },
  ];

  // https://mui.com/x/react-data-grid/column-groups/#define-column-groups
  const columnGroupingModel = [
    {
      groupId: "Pricing",
      children: [
        { field: "priceRetail" },
        { field: "priceMSRP" },
        { field: "priceOnline" },
      ],
    },
    {
      groupId: "Category",
      children: [{ field: "categoryID" }, { field: "categoryName" }],
    },
    {
      groupId: "Timestamps",
      children: [
        { field: "createdAt" },
        { field: "modifiedAt" },
        { field: "shopTimestamp" },
      ],
    },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight={true}
        pageSize={selectedPageSize}
        rowsPerPageOptions={[10, 25, 50, 100]}
        onPageSizeChange={(pageSize) => setSelectedPageSize(pageSize)}
        disableSelectionOnClick
        experimentalFeatures={{ columnGrouping: true }}
        columnGroupingModel={columnGroupingModel}
        // https://mui.com/x/react-data-grid/column-visibility/
        initialState={{
          columns: {
            columnVisibilityModel: {
              itemID: false,
              priceRetail: false,
              priceMSRP: false,
              priceOnline: false,
              categoryID: false,
              categoryName: false,
              createdAt: false,
              modifiedAt: false,
              shopTimestamp: false,
            },
          },
        }}
      />
    </Box>
  );
};

export default MuiDataGrid;
