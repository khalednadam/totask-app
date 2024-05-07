import { watch, onMounted, ref } from "vue";
import { useWorkspaces } from "../stores/workspaces.js";
import { socket } from "./socket.js"
import { storeToRefs } from "pinia";
import { useCardSearchStore } from "../stores/cardSearch.js";
import debounce from 'lodash.debounce'
import { useBoardSearch } from "../stores/boardSearch.js";
import { useRoute } from "vue-router";
import axiosInstance from "./axios.js";

// env
export const useUser = async () => {
  const user = ref();
  const getUser = async () => {
    try {
      const response = await axiosInstance.get(`/users/user`, {
        withCredentials: true,
      })
      user.value = response.data;
    } catch (err) {
      console.log(err);
    }
  }
  // getUser();
  onMounted(getUser);
  return { user, getUser };
}

/**
 * checks if the current logged in user is admins in a workspace
 * @param {Object} workspace
 * @param {ObjectId} userId
 * @returns {Boolean}
 */
export const amIAdmin = (workspace, userId) => {
  const isAdmin = ref(null);
  if (workspace.admins.some(admin => admin.id === userId)) {
    isAdmin.value = true;
  } else {
    isAdmin.value = false
  }
  return { isAdmin };
};

/**
 * get the workspace 
 * @param {ObjectId} workspaceId
 * @returns {Object}
 */
export const getWorkspace = (workspaceId) => {
  const workspace = ref(null);
  axiosInstance
    .get(`/w/${workspaceId}`, { withCredentials: true })
    .then((res) => {
      workspace.value = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return { workspace };
};

export const getRecentWorkspaces = () => {
  const isLoading = ref(true);
  const recentWorkspaces = ref(null);
  axiosInstance
    .get(`/w/my`, {
      withCredentials: true,
      params: {
        sortBy: "updatedAt:desc",
        limit: 5,
      },
    })
    .then((res) => {
      recentWorkspaces.value = res.data.results;
    })
    .catch((err) => {
      console.log(err);
    }).finally(() => {
      isLoading.value = false;
    })

  return { recentWorkspaces, isLoading };
};

export const getWorkspaces = () => {
  const workspacesStore = useWorkspaces();
  const myAdminWorkspaces = ref(null);
  const myMemberWorkspaces = ref(null);
  axiosInstance
    .get(`/w/myAdminWorkspaces`, {
      withCredentials: true,
      params: {
        sortBy: "updatedAt:desc",
      },
    })
    .then((res) => {
      myAdminWorkspaces.value = res.data.results;
      workspacesStore.myAdminWorkspaces = res.data.results;
    })
    .catch((err) => {
      console.log(err);
    });

  axiosInstance
    .get(`/w/myMemberWorkspaces`, {
      withCredentials: true,
    })
    .then((res) => {
      myMemberWorkspaces.value = res.data.results;
      workspacesStore.myMemberWorkspaces = res.data.results;
    })
    .catch((err) => {
      console.log(err);
    });
  return { myAdminWorkspaces, myMemberWorkspaces };
};

export const getAllWorkspaceMembers = (workspaceId) => {
  const members = ref(null);
  axiosInstance
    .get(`/w/getAllMembers/${workspaceId}`, {
      withCredentials: true,
    })
    .then((res) => {
      members.value = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return { members };
};

export const useCloasedBoards = (workspaceId, sortBy = null, limit = null) => {
  const closedBoards = ref(null);
  const closedBoardsLoading = ref(false);
  const getBoards = () => {
    closedBoardsLoading.value = true;
    axiosInstance
      .get(`/b/of/${workspaceId}`, {
        withCredentials: true,
        params: {
          sortBy,
          limit,
          name: " ",
          isClosed: true
        },
      })
      .then((res) => {
        closedBoards.value = res.data.results;
      })
      .catch((err) => {
        console.log(err);
      }).finally(() => {
        closedBoardsLoading.value = false;
      })
  }
  onMounted(() => {
    getBoards();
  })

  return { closedBoards, closedBoardsLoading };
};

export const useBoards = (workspaceId, sortBy, limit) => {
  const boards = ref(null);
  const boardSearch = useBoardSearch();
  const { searchWord } = storeToRefs(boardSearch);
  const isLoading = ref(false);
  const getBoards = () => {
    isLoading.value = true;
    axiosInstance
      .get(`/b/of/${workspaceId}`, {
        withCredentials: true,
        params: {
          sortBy,
          limit,
          name: searchWord.value || " ",
          isClosed: false
        },
      })
      .then((res) => {
        boards.value = res.data.results;
      })
      .catch((err) => {
        console.log(err);
      }).finally(() => {
        isLoading.value = false;
      })
  }
  onMounted(() => {
    getBoards();
  })

  watch(searchWord, debounce(() => {
    getBoards();
  }, 500))
  return { boards, isLoading };
};

export const addBoardToFavorite = (boardId) => {
  axiosInstance
    .put(
      `/users/addToFav`,
      {
        boardId,
      },
      {
        withCredentials: true,
      }
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const removeBoardFromFavorite = (boardId) => {
  axiosInstance
    .put(
      `/users/removeFromFav`,
      {
        boardId,
      },
      {
        withCredentials: true,
      }
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};


export const getMyAdminWorkspaces = () => {
  const workspacesStore = useWorkspaces();
  const myAdminWorkspaces = ref();
  axiosInstance
    .get(`/w/myAdminWorkspaces`, {
      withCredentials: true,
      params: {
        sortBy: "updatedAt:desc",
      },
    })
    .then((res) => {
      myAdminWorkspaces.value = res.data.results;
      workspacesStore.myAdminWorkspaces = res.data.results;
    })
    .catch((err) => {
      console.log(err);
    });
  return myAdminWorkspaces;
}

export const getBoardById = (boardId) => {
  const board = ref(null);
  const status = ref(null);
  const isLoading = ref(false);
  const getBoard = async () => {
    isLoading.value = true;
    try {
      const response = await axiosInstance.get(`/b/${boardId}`, {
        withCredentials: true,
      });
      status.value = response.status;
      board.value = response.data;
    } catch (err) {
      status.value = err.response.status;
      console.log(err.response);
    } finally {
      isLoading.value = false
    }
  }
  onMounted(async () => {
    await getBoard();
  })
  socket.on('change-board-info', async () => {
    await getBoard();
  })
  return { board, status, isLoading };
}

export const useLists = async (boardId) => {
  const lists = ref([]);
  const isLoading = ref(false);
  async function getLists() {
    isLoading.value = true;
    try {
      const response = await axiosInstance.get(`/list/listsOf/${boardId}`, { params: { sortBy: "position:asc", limit: 100 } });
      lists.value = response.data.results;
    } catch (err) {
      console.log(err);
    } finally {
      isLoading.value = false;
    }

    // axiosInstance.get(`/list/listsOf/${boardId}`, {
    //   withCredentials: true,
    //   params: {
    //     sortBy: "position:asc",
    //   },

    // }).then((res) => {
    //   lists.value = res.data.results;
    // })
    //   .catch((err) => {
    //     console.log(err);
    //   }).finally(() => {
    //     isLoading.value = false;
    //   })
  }

  // socket.on('update-lists', async (boardId) => {
  //   await getLists();
  // });

  socket.on("update-lists", (payload) => {
    lists.value = payload.results;
  })
  onMounted(async () => {
    await getLists();
  })


  return { lists, isLoading };
}

export const isUserAdmin = (boardId) => {
  const isAdmin = ref(false);
  axiosInstance.get(`/b/isUserAdmin/${boardId}`, {
    withCredentials: true
  }).then((res) => {
    isAdmin.value = res.data;
  }).catch((err) => {
    console.log(err);
  })
  return { isAdmin };
}

export const isUserWorkspaceAdmin = (workspaceId) => {
  const isUserAdmin = ref(true);
  axiosInstance.get(`/w/isUserAdmin/${workspaceId}`, {
    withCredentials: true
  }).then((res) => {
    isUserAdmin.value = res.data;
  }).catch((err) => {
    console.log(err);
  })
  return { isUserAdmin };
}

export const useCard = async (cardId) => {
  const isCardLoading = ref(false);
  const card = ref(null);
  async function getCard() {
    try {
      isCardLoading.value = true;
      const response = await axiosInstance.get(`/card/${cardId}`, {
        withCredentials: true
      });
      card.value = response.data;
      return response.data;
    } catch (err) {
      console.log(err);
    } finally {
      isCardLoading.value = false;
    }
  }
  await getCard();
  socket.on('update-card', async (updatedCardId) => {
    if (updatedCardId === cardId) {
      await getCard();
    }
  })
  return { card, isCardLoading };
}
export const useCardsOfList = (listId, boardId) => {
  const cards = ref([]);
  const isLoading = ref(false);
  const cardSearch = useCardSearchStore();
  const { searchWord, searchAssignees, searchLabels, searchDate } = storeToRefs(cardSearch);

  const getCards = () => {
    isLoading.value = true;
    axiosInstance.get(`/card/cardsOf/${listId}`, {
      withCredentials: true,
      params: {
        sortBy: "position:asc",
        limit: 100,
        title: searchWord.value || " ",
        assignees: searchAssignees.value,
        labels: searchLabels.value,
        date: searchDate.value,
        board: boardId,
      }
    }).then((res) => {
      cards.value = res.data.results
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      isLoading.value = false;
    })
  }

  const debouncedGetCards = debounce(getCards, 500);

  const handleCardSearchChange = () => {
    debouncedGetCards();
  };

  onMounted(() => {
    getCards();
  });

  watch([searchWord, searchAssignees, searchLabels, searchDate], handleCardSearchChange, { deep: true });

  return { cards, isLoading };
};
export const getMembersOfBoard = (boardId) => {
  const members = ref([]);
  axiosInstance.get(`/b/membersOf/${boardId}`, {
    withCredentials: true
  }).then((res) => {
    members.value = res.data;
  }).catch((err) => {
    console.log(err);
  })
  return { members };
}

/*
 * data fetcher
 * @param {string} url
 * @returns {Object} 
 */
export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)
  axiosInstance.get(url, { withCredentials: true })
    .then((res) => (data.value = res.data))
    .catch((err) => (error.value = err));

  return { data, error }
}


export const getWorkspaceMembersByBoardId = async (boardId) => {
  const workspaceMembers = ref(null);
  try {
    const response = await axiosInstance.get(`/b/workspaceMembersOf/${boardId}`, {
      withCredentials: true
    })
    workspaceMembers.value = response.data;
  }
  catch (err) {
    console.log(err);
  }
  return { workspaceMembers };
}

export const searchForUsers = async (email) => {
  const users = ref(null);
  try {
    const response = await axiosInstance.get(`/users/getUsers`, {
      withCredentials: true,
      params: {
        limit: 5,
        email: email
      }
    })
    users.value = response.data;
  } catch (err) {
    console.log(err);
  }
  return { users };
}

