export interface IUser {
  _id: string;
  email: string;
  password: string;
  avatar_larger: {
    url_list: string[];
  };
  avatar_thumb: {
    url_list: string[];
  };
  cover_url: {
    url_list: string[];
  };
  follower_count: number;
  follower_request_status: number;
  following_count: number;
  ip_location: string;
  is_blocked: boolean;
  is_effect_artist: boolean;
  is_gov_media_vip: boolean;
  nickname: string;
  original_musician: {
    music_count: number;
  };
  share_info: {
    share_desc: string;
    share_image_url: {
      url_list: string[];
    };
    share_url: string;
  };
  show_favorite_list: boolean;
  signature: string;
  signature_language: string;
  total_favorited: number;
  uid: string;
  createdAt?: string;
  updatedAt?: string;
}
