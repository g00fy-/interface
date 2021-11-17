

old_version=`jq '.version' package.json`
old_version=`sed -e 's/^"//' -e 's/"$//' <<<"$old_version"`
version_split=( ${old_version//./ } )

# increment the number at the 3rd position ( 0,1,2 )
minor_version=$((version_split[2] + 1))
new_version="${version_split[0]}.${version_split[1]}.${minor_version}"
# overwrite it in the package.json file
contents="$(jq  --arg updated_version "${new_version}" '.version = $updated_version' package.json)"
echo "${contents}" > package.json
# version bump display
echo "${old_version} --> ${new_version}"
# track the change
git add package.json

# # show off the updated version
# npm version | head -1

