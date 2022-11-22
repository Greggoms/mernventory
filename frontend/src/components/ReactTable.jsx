import React, { useMemo, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { format } from "date-fns";
import { TableContainer, ColumnVisibilityContainer } from "../css";

function ReactTableV8(props) {
  const [sorting, setSorting] = useState([]);
  // Columns that need to be "hidden" by default need to be set here
  const [columnVisibility, setColumnVisibility] = useState({
    itemID: false,
    priceRetail: false,
    priceMSRP: false,
    priceOnline: false,
    categoryID: false,
    categoryName: false,
    createdAt: false,
    modifiedAt: false,
    shopTimestamp: false,
  });

  const data = useMemo(
    () =>
      props.data.map((item, index) => {
        return {
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
          toShopQOH: props.toShopData.find(
            (thing) => thing.itemID === item.itemID
          ).qoh,
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
      }),
    [props]
  );

  const columns = useMemo(
    () => [
      {
        header: `# / ${props.data.length}`,
        accessorKey: "index",
      },
      {
        header: "Item ID",
        accessorKey: "itemID",
      },
      {
        header: "System SKU",
        accessorKey: "systemSku",
        // https://tanstack.com/table/v8/docs/examples/react/sub-components
        // This is needed because trying to set an <a href="...">{item.systemSku}</a>
        // inside the data mapping above renders an [object Object] React Symbol.
        cell: ({ getValue }) => {
          return (
            <a
              href={`https://us.merchantos.com/?name=item.views.item&form_name=view&id=${
                getValue().itemID
              }&tab=details`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {getValue().sku}
            </a>
          );
        },
      },
      {
        header: "Description",
        accessorKey: "description",
      },
      {
        header:
          props.toShopData.length > 0
            ? `Qty - ${props.toShopData[0].shopName}`
            : "Qty - You",
        accessorKey: "toShopQOH",
      },
      {
        header:
          props.fromShopData.length > 0
            ? `Qty - ${props.fromShopData[0].shopName}`
            : "Qty - Them",
        accessorKey: "fromShopQOH",
      },
      {
        header: "Reorder Point",
        accessorKey: "reorderPoint",
      },
      {
        header: "Reorder Level",
        accessorKey: "reorderLevel",
      },
      {
        header: "Pricing",
        columns: [
          {
            accessorKey: "priceRetail",
            header: () => <span>Retail</span>,
            cell: (info) => info.getValue(),
          },
          {
            accessorKey: "priceMSRP",
            header: () => <span>MSRP</span>,
            cell: (info) => info.getValue(),
          },
          {
            accessorKey: "priceOnline",
            header: () => <span>Online</span>,
            cell: (info) => info.getValue(),
          },
        ],
      },
      {
        header: "Category",
        columns: [
          {
            accessorKey: "categoryID",
            header: () => <span>ID</span>,
            cell: (info) => info.getValue(),
          },
          {
            accessorKey: "categoryName",
            header: () => <span>Name</span>,
            cell: (info) => info.getValue(),
          },
        ],
      },
      {
        header: "Timestamps",
        columns: [
          {
            accessorKey: "createdAt",
            header: () => <span>Created</span>,
            cell: (info) => info.getValue(),
          },
          {
            accessorKey: "modifiedAt",
            header: () => <span>Modified</span>,
            cell: (info) => info.getValue(),
          },
          {
            accessorKey: "shopTimestamp",
            header: () => <span>Shop Timestamp</span>,
            cell: (info) => info.getValue(),
          },
        ],
      },
    ],
    [props]
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  const checkedStyles = {
    active: {
      border: `2px solid #1db954`,
    },
    inactive: {
      border: `2px solid #8C8C8C`,
      color: `#8C8C8C`,
    },
  };

  return (
    <>
      <ColumnVisibilityContainer>
        <h3>Show/Hide Columns</h3>
        <div className="label-list">
          <label className="toggle-all">
            <input
              {...{
                type: "checkbox",
                checked: table.getIsAllColumnsVisible(),
                onChange: table.getToggleAllColumnsVisibilityHandler(),
              }}
            />{" "}
            <p>Toggle All</p>
          </label>
          {table.getAllLeafColumns().map((column) => {
            return (
              <label
                key={column.id}
                style={
                  column.getIsVisible()
                    ? checkedStyles.active
                    : checkedStyles.inactive
                }
              >
                <input
                  {...{
                    type: "checkbox",
                    checked: column.getIsVisible(),
                    onChange: column.getToggleVisibilityHandler(),
                  }}
                />{" "}
                <p>{column.id}</p>
              </label>
            );
          })}
        </div>
      </ColumnVisibilityContainer>

      <TableContainer>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div
                        role="button"
                        tabIndex={0}
                        aria-label="Sort Column"
                        // This doesn't work for some reason, but the aria warning is gone.
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            console.log(
                              `You tried to sort a column using the keyboard!`
                            );
                            header.column.getToggleSortingHandler();
                          }
                        }}
                        {...{
                          className: header.column.getCanSort()
                            ? "cursor-pointer select-none"
                            : "",
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: " 🔼",
                          desc: " 🔽",
                        }[header.column.getIsSorted()] ?? null}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </TableContainer>
    </>
  );
}

export default ReactTableV8;
