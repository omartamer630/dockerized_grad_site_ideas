import { NewIdeaProps } from "../types";

export const getIdea = async (_id: string) => {
  try {
    const response = await fetch(`/api/idea/${_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      let errorMessage = { message: "Unexpected Error Happened" };
      try {
        const errorData = await response.json();
        errorMessage = errorData ?? errorMessage;
      } catch {
        errorMessage = { message: "Error parsing response" };
      }
      throw errorMessage;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (typeof error === "object" && error !== null && "message" in error) {
      throw error;
    } else {
      throw { message: "An unexpected error occurred." };
    }
  }
};

export const getIdeas = async (q?: string) => {
  try {
    const response = await fetch(`/api/idea${q ? `/?q=${q}` : ""}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      let errorMessage = { message: "Unexpected Error Happened" };
      try {
        const errorData = await response.json();
        errorMessage = errorData ?? errorMessage;
      } catch {
        errorMessage = { message: "Error parsing response" };
      }
      throw errorMessage;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (typeof error === "object" && error !== null && "message" in error) {
      throw error;
    } else {
      throw { message: "An unexpected error occurred." };
    }
  }
};

export const addIdea = async (idea: NewIdeaProps) => {
  try {
    const response = await fetch(`/api/idea`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(idea),
    });

    if (!response.ok) {
      let errorMessage = { message: "Unexpected Error Happened" };
      try {
        const errorData = await response.json();
        errorMessage = errorData ?? errorMessage;
      } catch {
        errorMessage = { message: "Error parsing response" };
      }
      throw errorMessage;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (typeof error === "object" && error !== null && "message" in error) {
      throw error;
    } else {
      throw { message: "An unexpected error occurred." };
    }
  }
};

export const editIdea = async (_id: string, ideaData: NewIdeaProps) => {
  try {
    const response = await fetch(`/api/idea/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...ideaData }),
    });

    if (!response.ok) {
      let errorMessage = { message: "Unexpected Error Happened" };
      try {
        const errorData = await response.json();
        errorMessage = errorData ?? errorMessage;
      } catch {
        errorMessage = { message: "Error parsing response" };
      }
      throw errorMessage;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (typeof error === "object" && error !== null && "message" in error) {
      throw error;
    } else {
      throw { message: "An unexpected error occurred." };
    }
  }
};

export const deleteIdea = async (_id: string) => {
  try {
    const response = await fetch(`/api/idea/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      let errorMessage = { message: "Unexpected Error Happened" };
      try {
        const errorData = await response.json();
        errorMessage = errorData ?? errorMessage;
      } catch (error) {
        console.error(error);
        errorMessage = { message: "Error parsing response" };
      }
      throw errorMessage;
    }
    if (response.status === 204) {
      return;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    if (typeof error === "object" && error !== null && "message" in error) {
      throw error;
    } else {
      throw { message: "An unexpected error occurred." };
    }
  }
};
