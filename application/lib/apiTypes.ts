export interface UserLoginRequest {
    username: string;
    password: string;
}

export interface UserLoginResponse {
    user_id: number;
}

export interface UserRegistrationRequest {
    email: string;
    username: string;
    password: string;
}

export interface UserRegistrationResponse {
    user_id: number;
}

export interface GetUserProfileResponse {
    id: number;
    email: string;
    username: string;
    img_path?: string;
    post_ids?: number[];
    community_ids?: number[];
    tags?: number[];
    admin: number;
    display_name?: string;
    description?: string;
}

export interface UpdateUserProfileRequest {
    img_path: string;
    password: string;
}

export interface UpdateUserProfileBackendRequest {
    communities: number[];
    POST_Ids: number[];
    TAGS: number[];
}

export interface CreateCommunityRequest {
    Name: string;
    Description: string;
    Img_path?: string | null;
    Tags: string;
}

export interface CreateCommunityResponse {
    community_id: number;
}

export interface GetCommunityResponse {
    id: number;
    name: string;
    description: string;
    img_path: string;
    member_count: number;
    tags: number[];
    post_ids: number[];
}

export interface UpdateCommunityUserRequest {
    name?: string;
    description?: string;
    img_path?: string;
}

export interface UpdateCommunityBackendRequest {
    member_count: number;
    tags: number[];
    POST_IDs: number[];
}

export interface CreatePostRequest {
    Title?: string;
    MainText: string;
    auth_id: number;
    com_id: number;
    post_id_ref?: number;
    comment_flag: boolean;
}

export interface CreatePostResponse {
    post_id: number;
}

export interface GetPostResponse {
    id: number;
    title: string;
    main_text: string;
    timestamp: Date;
    likes: number;
    dislikes: number;
    post_id_ref: number;
    comment_flag: boolean;
    comment_count: number;
    comments: number[];
    Img?: string;
    voteState: "like" | "dislike" | "none";
    author: {
        auth_id: number;
        username: string;
        imagePath: string;
        isAdmin: number;
    };
    community: {
        com_id: number;
        name?: string;
    }
}

export interface GetMultiplePostsResponse {
    posts: {
        post_id: number;
        title: string;
        main_text: string;
        auth_id: number;
        com_id: number;
        timestamp: string;
        likes: number;
        dislikes: number;
        post_id_ref: number;
        comment_flag: boolean;
        comment_count: number;
        author: {
            username: string;
            imagePath: string;
            isAdmin?: number;
        };
        community: {
            com_id: number;
            name: string;
        }
    }[];
    total_count: number;
    next_offset: number;
}

export interface UpdatePostUserRequest {
    title: string;
    main_text: string;
}

export interface UpdatePostBackendRequest {
    COMMENT_CNT: number;
    LIKES: number;
    DISLIKES: number;
    COMMENTS: string[];
}

export interface VoteRequest {
    likes: number;
    dislikes: number;
}

export interface CommentsRequest {
    Comments: number[];
}

export interface SearchPostsResponse {
    results: {
        post_id: number;
        title: string;
        main_text: string;
        timestamp: Date;
    }[];
}

export interface SearchUserResponse {
    results: {
        user_id: number;
        username: string;
        IMG_PATH: string;
    }[];
}

export type GetAllCommunitiesResponse = {
    names: string;
    description: string;
    communityID: number;
}[];

export type VotePostRequest = {
    userId: number;
    voteType: "like" | "dislike" | "none";
}