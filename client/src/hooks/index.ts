import { useCallback, useEffect, useState } from "react";
import { IdeaProps, NewIdeaProps, returnedIdeasProps } from "../types";
import {
  addIdea,
  deleteIdea,
  editIdea,
  getIdea,
  getIdeas,
} from "../utils/Apis";
import { useNavigate } from "react-router-dom";

export const useGetIdeas = () => {
  const [data, setData] = useState<returnedIdeasProps | null>(null);
  const [error, setError] = useState<Record<string, string> | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleGetIdeas = useCallback(async (q?: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const ideaData = await getIdeas(q);
      setData(ideaData);
      setSuccess(true);
    } catch (err) {
      if (
        typeof err === "object" &&
        err !== null &&
        ("message" in err || "title" in err || "content" in err)
      ) {
        setError(err as Record<string, string>);
      } else {
        setError({ message: "An unexpected error occurred." });
      }
    } finally {
      setLoading(false);
    }
  }, []); // Ensure no dependencies that change on every render

  return { data, error, loading, success, handleGetIdeas };
};

export const useGetIdea = (_id: string) => {
  const [data, setData] = useState<IdeaProps | null>(null);
  const [error, setError] = useState<Record<string, string> | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleGetIdea = useCallback(async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const ideaData = await getIdea(_id);
      setData(ideaData);
      setSuccess(true);
    } catch (err) {
      if (
        typeof err === "object" &&
        err !== null &&
        ("message" in err || "title" in err || "content" in err)
      ) {
        setError(err as Record<string, string>);
      } else {
        setError({ message: "An unexpected error occurred." });
      }
    } finally {
      setLoading(false);
    }
  }, [_id]);

  return { data, error, loading, success, handleGetIdea };
};

export const useAddIdea = (idea: NewIdeaProps) => {
  const [id, setId] = useState<string | null>(null);
  const [error, setError] = useState<Record<string, string> | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const NavigateTo = useNavigate();

  const handleAddIdea = useCallback(async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      setId(await addIdea(idea));
      setSuccess(true);
    } catch (err) {
      if (
        typeof err === "object" &&
        err !== null &&
        ("message" in err || "title" in err || "content" in err)
      ) {
        setError(err as Record<string, string>);
      } else {
        setError({ message: "An unexpected error occurred." });
      }
    } finally {
      setLoading(false);
    }
  }, [idea]);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        NavigateTo(`/get-idea/${id}`);
      }, 2000);
    }
    if (error) {
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  }, [error, success, NavigateTo, id]);

  return { error, loading, success, handleAddIdea };
};

export const useEditIdea = () => {
  const [id, setId] = useState<string | null>(null);
  const [error, setError] = useState<Record<string, string> | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const NavigateTo = useNavigate();

  const handleEditIdea = async (_id: string, data: NewIdeaProps) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      setId(await editIdea(_id, data));
      setSuccess(true);
    } catch (err) {
      if (
        typeof err === "object" &&
        err !== null &&
        ("message" in err || "titleOrContent" in err)
      ) {
        setError(err as Record<string, string>);
      } else {
        setError({ message: "An unexpected error occurred." });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        NavigateTo(`/get-idea/${id}`);
      }, 2000);
    }
    if (error) {
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  }, [error, success, NavigateTo, id]);

  return { error, loading, success, handleEditIdea };
};

export const useDeleteIdea = () => {
  const [error, setError] = useState<Record<string, string> | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleDeleteIdea = async (_id: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await deleteIdea(_id);
      setSuccess(true);
    } catch (err) {
      if (typeof err === "object" && err !== null && "message" in err) {
        setError(err as Record<string, string>);
      } else {
        setError({ message: "An unexpected error occurred." });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  }, [error]);

  return { error, loading, success, handleDeleteIdea };
};
