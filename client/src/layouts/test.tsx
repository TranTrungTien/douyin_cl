export function fetchProfileData() {
  let postsPromise = fetchPosts();
  return {
    posts: wrapPromise(postsPromise),
  };
}

// Suspense integrations like Relay implement
// a contract like this to integrate with React.
// Real implementations can be significantly more complex.
// Don't copy-paste this into your project!
function wrapPromise(promise: Promise<any>) {
  let status = "pending";
  let result: any;
  let suspender = promise.then(
    (r) => {
      status = "success";
      result = r;
    },
    (e) => {
      status = "error";
      result = e;
    }
  );
  return {
    read() {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw result;
      } else if (status === "success") {
        return result;
      }
    },
  };
}

function fetchPosts() {
  console.log("fetch posts...");
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("fetched posts");
      resolve([
        {
          id: 0,
          text: "I get by with a little help from my friends",
        },
        {
          id: 1,
          text: "I'd like to be under the sea in an octupus's garden",
        },
        {
          id: 2,
          text: "You got that sand all over your feet",
        },
      ]);
    }, 5000);
  });
}
const resource = fetchProfileData();
const Test = () => {
  const data = resource.posts.read();
  console.log({ data });

  return (
    <ul>
      {Array.isArray(data) && data.map((d) => <li key={d.id}>{d.text}</li>)}
    </ul>
  );
};

export default Test;
