import { ChangeEvent, useCallback, useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";

import { IPFS_NEAR_SOCIAL_URL } from "@/common/constants";
import {
  add_admins_to_list,
  create_list,
  delete_list,
  getList,
  update_list,
} from "@/common/contracts/potlock/lists";
import uploadFileToIPFS from "@/common/services/ipfs";
import { fetchSocialImages } from "@/common/services/near-socialdb";
import { AccessControlAccounts } from "@/modules/access-control";
import useWallet from "@/modules/auth/hooks/useWallet";
import { createListSchema } from "@/modules/lists/models/schema";

import {
  ListConfirmationModal,
  ListConfirmationModalProps,
  SuccessModalCreateList,
} from "./ListConfirmationModals";

interface FormData {
  name: string;
  description: string;
  allowApplications: boolean;
  approveApplications: boolean;
  image_cover_url?: string;
  owner?: string;
}

interface ChipProps {
  label: string;
  onRemove: () => void;
}

interface CreateSuccess {
  open: boolean;
  type?: "UPDATE_LIST" | "CREATE_LIST";
  data?: any;
}

export const ListFormDetails: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(createListSchema),
  });
  const { id } = useParams();
  const { push, back } = useRouter();
  const onEditPage = !!id;

  const descriptionLength = watch("description")?.length || 0;

  const [admins, setAdmins] = useState<string[]>([]);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [listConfirmModal, setOpenListConfirmModal] =
    useState<ListConfirmationModalProps>({
      open: false,
    });
  const [listCreateSuccess, setListCreateSuccess] = useState<CreateSuccess>({
    open: false,
  });
  const { wallet } = useWallet();

  useEffect(() => {
    const fetchListDetails = async () => {
      try {
        const response: any = await getList({
          list_id: parseInt(id as string) as any,
        });
        setValue("name", response.name);
        setValue("owner", response.owner);
        setValue("description", response.description);
        setValue("allowApplications", response.default_registration_status);
        setValue("approveApplications", response.admin_only_registrations);
        setAdmins(response.admins);
        setCoverImage(response.cover_image_url);
      } catch (error) {
        console.error("Error fetching list details:", error);
      }
    };

    if (onEditPage) fetchListDetails();
  }, [id, setValue]);

  useEffect(() => {
    const fetchProfileImage = async () => {
      const { image } = await fetchSocialImages({
        accountId: wallet?.accountId || "",
      });
      setProfileImage(image);
    };
    if (wallet?.accountId) fetchProfileImage();
  }, [wallet]);

  const onSubmit: SubmitHandler<FormData> = async (data, event) => {
    // Due to conflicting submit buttons (admin and list), this is to make sure only list submit form is submitted.
    if (
      (event?.nativeEvent as SubmitEvent)?.submitter?.id !==
      "list-submit-button"
    )
      return;

    if (onEditPage) {
      update_list({
        ...data,
        admins,
        list_id: parseInt(id as any),
        image_cover_url: coverImage || undefined,
      })
        .then((updatedData) => {
          setListCreateSuccess({
            open: true,
            type: "UPDATE_LIST",
            data: updatedData,
          });
        })
        .catch((error) => {
          // Handle error for update_list
          console.error("Error updating list:", error);
        });
    } else {
      create_list({
        ...data,
        admins,
        image_cover_url: coverImage,
      })
        .then((dataToReturn) => {
          // Handle success for create_list
          setListCreateSuccess({
            open: true,
            type: "CREATE_LIST",
            data: dataToReturn,
          });
        })
        .catch((error) => {
          // Handle error for create_list
          console.error("Error creating list:", error);
        });
    }
  };

  const handleCoverImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      const res = await uploadFileToIPFS(e.target.files[0]);
      if (res.ok) {
        const data = await res.json();
        setCoverImage(`${IPFS_NEAR_SOCIAL_URL}${data.cid}` as string);
        setValue("image_cover_url", `${IPFS_NEAR_SOCIAL_URL}${data.cid}`);
      }
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleViewList = useCallback(() => {
    if (listCreateSuccess.data.id) push(`/list/${listCreateSuccess.data?.id}`);
  }, []);

  const handleDeleteList = () => {
    delete_list({ list_id: parseInt(id as any) })
      .then(() => {
        push("/list");
      })
      .catch((error) => {
        console.error("Error deleting list", error);
      });
  };

  const handleSaveAdminsSettings = () => {
    add_admins_to_list({
      list_id: parseInt(id as any),
      admins,
    })
      .then((data) => {
        console.log("Added admins to list", data);
      })
      .catch((error) => {
        console.error("Error deleting list", error);
      });
  };

  return (
    <>
      <div className="mx-auto max-w-[896px] p-6 font-sans">
        <h2 className="mb-6 text-2xl font-bold">List details</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="mb-2 block font-semibold text-gray-700">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter name"
              className="w-full rounded-md border px-4 py-2"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div>
            <label className="mb-2 block font-semibold text-gray-700">
              Describe your List
            </label>
            <textarea
              placeholder="Type description"
              className="w-full rounded-md border px-4 py-2"
              maxLength={250}
              {...register("description", { required: true })}
            ></textarea>
            <div className="text-right text-gray-500">
              {descriptionLength}/250
            </div>
            {errors.description && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div className="md:items-center md:flex-row  md:space-y-0 md:space-x-4 flex flex-col justify-between space-y-6 pb-[50px]">
            <div className="flex items-center space-x-2">
              <label className="inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  {...register("allowApplications")}
                />
                <div className="peer relative h-6 w-11 rounded-md bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-md after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#474647] peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#a4a2a4] dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-[#474647] rtl:peer-checked:after:-translate-x-full"></div>
              </label>
              <label className="font-semibold text-gray-700">
                Allow applications
              </label>
            </div>
            <div className="m-0 flex items-center">
              <input
                type="checkbox"
                id="approve-applications"
                className="ml-0 mr-2"
                defaultChecked
                {...register("approveApplications")}
              />
              <label
                htmlFor="approve-applications"
                className="font-semibold text-gray-700"
              >
                Automatically approve applications
              </label>
            </div>
          </div>
          <h3 className="mb-4 mt-8 text-xl font-semibold">Permissions</h3>
          <div className="md:flex-row md:items-center md:space-y-0 flex flex-col items-start space-x-6 space-y-8">
            <div className="flex items-center">
              <div>
                <span className="mr-4 font-semibold text-gray-700">Owner</span>
                <div className="flex items-center space-x-2">
                  <img
                    src={profileImage || "https://via.placeholder.com/40"}
                    alt="Owner"
                    className="h-6 w-6 rounded-full border-2 border-white"
                  />
                  <span className="text-xs text-gray-700">
                    {onEditPage ? watch("owner") : wallet?.accountId}
                  </span>
                </div>
              </div>
            </div>
            <div className=" translate-y-1">
              <div className="flex items-end  space-x-2">
                <div className="flex flex-col gap-2">
                  <div className="translate-y-1 justify-between">
                    <p className="font-semibold text-gray-700">Admins</p>
                  </div>
                  <div className="flex h-[35px]  flex-wrap">
                    <AccessControlAccounts
                      title="Admins"
                      value={admins}
                      showOnSaveButton={admins.length > 0}
                      onSubmit={(admins) => setAdmins(admins)}
                      onSaveSettings={handleSaveAdminsSettings}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="mb-2 mt-10 text-xl font-semibold">
              Upload list cover image{" "}
              <span className="font-normal text-gray-500">(Optional)</span>
            </h3>
            <div
              className="relative flex h-40 w-full items-center justify-center rounded-md bg-gray-100"
              style={{
                backgroundImage: `url(${coverImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <input
                type="file"
                accept="image/*"
                id="uploadCoverImage"
                onChange={handleCoverImageChange}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              />
              <button
                type="button"
                onClick={() =>
                  document.getElementById("uploadCoverImage")?.click()
                }
                className="absolute bottom-4 right-4 rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 transition hover:bg-gray-50"
              >
                <span className="mr-2">📷</span> Add cover photo
              </button>
            </div>
          </div>
          <div
            className={`md:flex-row flex w-full flex-col justify-between ${onEditPage ? "flex-col-reverse" : "md:justify-end flex-col"} `}
          >
            <button
              onClick={() =>
                setOpenListConfirmModal({ open: true, type: "DELETE" })
              }
              className={`mb-4 rounded-md border border-[#DD3345] bg-transparent px-4 py-2 text-[#DD3345] transition hover:bg-[#ede9e9] ${onEditPage ? "" : "hidden"}`}
            >
              Delete List
            </button>
            <div className="md:justify-end md:flex-row md:space-y-0 md:space-x-4 flex flex-col-reverse justify-center">
              <button
                type="button"
                className="mb-4 rounded-md bg-gray-100 px-4 py-2 text-gray-700 transition hover:bg-gray-200"
                onClick={back}
              >
                {onEditPage ? "Discard" : "Cancel"}
              </button>
              <button
                type="submit"
                id="list-submit-button"
                className="md:mb-0 mb-4 h-max rounded-md bg-gray-700 px-4 py-2 text-white transition hover:bg-gray-800"
              >
                {onEditPage ? "Save Settings" : "Save List"}
              </button>
            </div>
          </div>
        </form>
      </div>
      <ListConfirmationModal
        open={listConfirmModal.open}
        type={listConfirmModal.type}
        onClose={() => setOpenListConfirmModal({ open: false })}
        onSubmitButton={handleDeleteList}
      />
      <SuccessModalCreateList
        isOpen={listCreateSuccess.open}
        onClose={() => {
          setListCreateSuccess({ open: false });
        }}
        isUpdate={listCreateSuccess.type === "UPDATE_LIST"}
        listName={listCreateSuccess.data?.name}
        onViewList={handleViewList}
      />
    </>
  );
};
